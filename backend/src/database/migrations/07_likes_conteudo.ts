import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('likes_conteudo', table => {
    table.increments('id_like').primary()

    table.integer('id_usuario')
      .unsigned().notNullable()
      .references('id_usuario').inTable('usuarios')

    table.integer('id_conteudo')
      .unsigned().notNullable()
      .references('id_conteudo').inTable('conteudos')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('likes_conteudo')
}