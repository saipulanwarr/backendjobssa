'use strict'

const User = use('App/Models/User');

class AuthController {
    async register({ request, auth, response }){
        const status = request.input("status");
        const username = request.input('username');
        const name = request.input("name");
        const email = request.input("email");
        const password = request.input("password");
        const telephone = request.input("telephone");
        const address = request.input("address");

        let user = new User()
        user.username = username
        user.status = status
        user.name = name
        user.email = email
        user.password = password
        user.telephone = telephone
        user.address = address

        user = await user.save()
        let accessToken = await auth.withRefreshToken().generate(user)

        return response.status(200).json({
            user: user,
            token: accessToken
        })
    }

    async login({ request, auth, response }){
        const email = request.input('email')
        const password = request.input('password')

        try{
            let accessToken = await auth.withRefreshToken().attempt(email, password)
            return response.status(200).json({
                token: accessToken
            })
        }
        catch(e){
            return response.json({ message: 'You first need to register' });
        }
    }

    async profile({ response, auth }){
        return response.send(auth.current.user)
    }

    async refreshToken({ request, auth }){
        const refreshToken = request.input('refresh_token')
        return await auth
        .newRefreshToken()
        .generateForRefreshToken(refreshToken)
    }

    async logout({ auth, response }){
        const apiToken = auth.getAuthHeader()
        await auth
            .authenticator('jwt')
            .revokeTokens([apiToken])
        
        return response.send({ message: 'Logout successfully!' })
    }
}

module.exports = AuthController
