'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EducationSchema extends Schema {
  up () {
    this.create('educations', (table) => {
      table.increments()
      table.string('name').nullable()
      table.string('qualification', 100).nullable()
      table.string('field_of_studies', 100).nullable()
      table.string('major', 100).nullable()
      table.string('gpa', 10).nullable()
      table.string('graduation_year', 50).nullable()
      table.string('additional_information').nullable()
      table.integer('user_id').unsigned().references().inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('educations')
  }
}

module.exports = EducationSchema
