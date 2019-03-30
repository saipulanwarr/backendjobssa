'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobSchema extends Schema {
  up () {
    this.create('jobs', (table) => {
      table.increments()
      table.string('title_job').nullable()
      table.string('salary').nullable()
      table.string('experience').nullable()
      table.string('responsibilities').nullable()
      table.string('requirements').nullable()
      table.integer('user_id').unsigned().references().inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('jobs')
  }
}

module.exports = JobSchema
