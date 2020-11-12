import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('tipo_usuario', table => {
    table.increments('id_tipo').primary()
    table.string('descritivo').notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('tipo_usuario')
}