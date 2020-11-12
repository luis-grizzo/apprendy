import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('tags', table => {
    table.increments('id_tag').primary()
    table.string('descritivo').notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('tags')
}