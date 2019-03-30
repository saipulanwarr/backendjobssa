'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExperienceSchema extends Schema {
  up () {
    this.create('experiences', (table) => {
      table.increments()
      table.string('position_title').nullable()
      table.string('company_name').nullable()
      table.string('joined_duration').nullable()
      table.string('experience_description').nullable()
      table.string('monthly_salary').nullable()
      table.integer('user_id').unsigned().references().inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('experiences')
  }
}

module.exports = ExperienceSchema
