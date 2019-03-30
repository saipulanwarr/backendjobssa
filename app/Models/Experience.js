'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Experience extends Model {
    static get table(){
        return 'experiences'
    }

    static get primaryKey(){
        return 'id'
    }

    user(){
        return this.belongsTo('App/Models/User');
    }
}

module.exports = Experience
