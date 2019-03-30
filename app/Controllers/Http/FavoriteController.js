'use strict'

const Favorite = use('App/Models/Favorite');

class FavoriteController {
	async index({params, response}){
		let favorite = await Favorite.query().where('user_id', '=', params.id).with('job').with('job.user').with('user').fetch()
		
		return response.json(favorite);
	}
	
	async countfavorite({params, response}){
		let favorite = await Favorite.query().where('user_id', '=', params.id).count();
		
		const total = favorite[0]['count(*)']
		
		return response.json(total)
	}
	
	async store({request, response}){
		try{
			const favoriteInfo = request.only(['user_id', 'job_id'])
			const favorite = await Favorite.query().where('user_id', '=', favoriteInfo.user_id).where('job_id', '=', favoriteInfo.job_id).first()
			
			if(!favorite){
				const favorite = new Favorite()
				favorite.user_id = favoriteInfo.user_id
				favorite.job_id = favoriteInfo.job_id
				
				await favorite.save()
				let favoriteee = await Favorite.query().where('user_id', '=', favoriteInfo.user_id).where('job_id', '=', favoriteInfo.job_id).with('job').with('job.user').with('user').first()
				return response.status(201).json({
					favorite: favoriteee,
					message: "Favorite Has Been Added"
				});
			}else{
				
				await favorite.delete()
				
				return response.status(201).json({
					id: favoriteInfo.job_id,
                    message: "Favorite Has Been Deleted"
                })
			}
		}
		catch(e){
			return response.status(404).json({
                message: "something went wrong"
            })
		}
	}
}

module.exports = FavoriteController
