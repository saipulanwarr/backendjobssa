'use strict'

const User = use('App/Models/User');

class UserController {
	async index({params, response}){
		let user = await User.query().where('id', '=', params.id).with('education').with('experience').first()
		
		return response.json(user)
	}
    async update({params, request, response }){
        const userInfo = request.only(['name', 'gender', 'telephone', 'email', 'address', 'date_of_birth', 'expected_salary', 'additional_information'])

        const user = await User.find(params.id)
        if(!user){
            return response.status(404).json({
                data: 'Resource not found'
            })
        }

        user.name = userInfo.name
        user.gender = userInfo.gender
        user.telephone = userInfo.telephone
        user.email = userInfo.email
        user.address = userInfo.address
        user.date_of_birth = userInfo.date_of_birth
        user.expected_salary = userInfo.expected_salary
        user.additional_information = userInfo.additional_information

        await user.save()

        return response.status(200).json(user)
    }
}

module.exports = UserController
