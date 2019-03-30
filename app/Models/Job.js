'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Job extends Model {
    static get table(){
        return 'jobs'
    }

    static get primaryKey(){
        return 'id'
    }

    user(){
        return this.belongsTo('App/Models/User');
    }
}

module.exports = Job
