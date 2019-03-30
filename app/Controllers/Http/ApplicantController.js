'use strict'

const Applicant = use('App/Models/Applicant');

class ApplicantController {

    async index({params, response}){
        let applicant = await Applicant.query().with('job').with('job.user').with('user').fetch()

        return response.json(applicant);
    }
	
	async countuser({ params, response }){
		let applicant = await Applicant.query().where('job_id', '=', params.id).count();
		
		const total = applicant[0]['count(*)']
		
		return response.json(total);
	}

    async store({ request, response }){
        try{
            const applicantInfo = request.only(['user_id', 'job_id', 'status'])
            const applicant = await Applicant.query().where('user_id', '=', applicantInfo.user_id).where('job_id', '=', applicantInfo.job_id).first()

            if(!applicant){
                const applicant = new Applicant()
                applicant.user_id = applicantInfo.user_id
                applicant.job_id = applicantInfo.job_id
                applicant.status = applicantInfo.status
        
                await applicant.save()

                return response.status(201).json(applicant);
            }else{
                return response.status(201).json({
                    message: "Data Found"
                })
            }
        }
        catch(e){
            return response.status(404).json({
                message: "something went wrong"
            })
        }
    }
	
	async update({ params, request, response }){
        const applicantInfo = request.only(['status', 'date_of_interview'])

        const applicant = await Applicant.find(params.id)

        if(!applicant){
            return response.status(404).json({
                data: 'Resource not found'
            })
        }

        applicant.status = applicantInfo.status
		applicant.date_of_interview = applicantInfo.date_of_interview

        await applicant.save()

        return response.status(200).json(applicant)
    }
	
	async delete({ params, response }){
		const applicant = await Applicant.find(params.id)
		
		if(!applicant){
			return response.status(404).json({
				data: 'Resource not found'
			})
		}
		
		await applicant.delete()
		
		return response.status(200).json({
			id: params.id
		})
	}
}

module.exports = ApplicantController
