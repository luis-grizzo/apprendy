import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('tags_conteudos', table => {
    table.increments('id_tag_conteudo').primary()

    table.integer('id_conteudo')
      .unsigned().notNullable()
      .references('id_conteudo').inTable('conteudos')
    
    table.integer('id_tag')
      .unsigned().notNullable()
      .references('id_tag').inTable('tags')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('tags_conteudos')
}