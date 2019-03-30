'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ApplicantSchema extends Schema {
  up () {
    this.create('applicants', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references().inTable('users')
      table.integer('job_id').unsigned().references().inTable('jobs')
	  table.string('status').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('applicants')
  }
}

module.exports = ApplicantSchema
