'use strict'

const Experience = use('App/Models/Experience');

class ExperienceController {
    async index({ params, response }){
        let experience = await Experience.query().with('user').where('user_id', '=', params.id).fetch()

        return response.json(experience);
    }

    async store({ request, response }){
        const experienceInfo = request.only(['position_title', 'company_name', 'joined_duration', 'experience_description', 'monthly_salary', 'user_id'])

        const experience = new Experience()
        experience.position_title = experienceInfo.position_title
        experience.company_name = experienceInfo.company_name
        experience.joined_duration = experienceInfo.joined_duration
        experience.experience_description = experienceInfo.experience_description
        experience.monthly_salary = experienceInfo.monthly_salary
        experience.user_id = experienceInfo.user_id

        await experience.save()

        return response.status(201).json(experience)
    }

    async update({ params, request, response }){
        const experienceInfo = request.only(['position_title', 'company_name', 'joined_duration', 'experience_description', 'monthly_salary'])

        const experience = await Experience.find(params.id)

        if(!experience){
            return response.status(404).json({
                data: 'Resource not found'
            })
        }

        experience.position_title = experienceInfo.position_title
        experience.company_name = experienceInfo.company_name
        experience.joined_duration = experienceInfo.joined_duration
        experience.experience_description = experienceInfo.experience_description
        experience.monthly_salary = experienceInfo.monthly_salary

        await experience.save()

        return response.status(200).json(experience);
    }

    async delete({ params, response }){
        const experience = await Experience.find(params.id)

        if(!experience){
            return response.status(404).json({
                data: 'Resource not found'
            })
        }

        await experience.delete()

        return response.status(200).json({
            id: params.id
        })
    }
}

module.exports = ExperienceController
