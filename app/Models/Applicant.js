'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Applicant extends Model {
    static get table(){
        return 'applicants'
    }

    static get primaryKey(){
        return 'id'
    }

    job(){
        return this.belongsTo('App/Models/Job');
    }

    user(){
        return this.belongsTo('App/Models/User');
    }
}

module.exports = Applicant
