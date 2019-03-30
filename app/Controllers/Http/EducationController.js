'use strict'

const Education = use('App/Models/Education');

class EducationController {

    async index({ params, response }){
        let education = await Education.query().with('user').where('user_id', '=', params.id).fetch()

        return response.json(education);
    }

    async store({ request, response }){
        const educationInfo = request.only(['name', 'qualification', 'field_of_studies', 'major', 'gpa', 'graduation_year', 'additional_information', 'user_id'])

        const education = new Education()
        education.name = educationInfo.name
        education.qualification = educationInfo.qualification
        education.field_of_studies = educationInfo.field_of_studies
        education.major = educationInfo.major
        education.gpa = educationInfo.gpa
        education.graduation_year = educationInfo.graduation_year
        education.additional_information = educationInfo.additional_information
        education.user_id = educationInfo.user_id

        await education.save()

        return response.status(201).json(education);
    }

    async update({ params, request, response }){
        const educationInfo = request.only(['name', 'qualification', 'field_of_studies', 'major', 'gpa', 'graduation_year', 'additional_information'])

        const education = await Education.find(params.id)

        if(!education){
            return response.status(404).json({
                data: 'Resource not found'
            })
        }

        education.name = educationInfo.name
        education.qualification = educationInfo.qualification
        education.field_of_studies = educationInfo.field_of_studies
        education.major = educationInfo.major
        education.gpa = educationInfo.gpa
        education.graduation_year = educationInfo.graduation_year
        education.additional_information = educationInfo.additional_information

        await education.save()

        return response.status(200).json(education)
    }

    async delete({ params, response }){
        const education = await Education.find(params.id)

        if(!education){
            return response.status(404).json({
                data: 'Resource not found'
            })
        }

        await education.delete()

        return response.status(200).json({ id: params.id })
    }
}

module.exports = EducationController
