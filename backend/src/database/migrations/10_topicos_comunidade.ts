import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('topicos_comunidade', table => {
    table.increments('id_topico_comunidade').primary()
    table.string('titulo').notNullable()
    table.text('conteudo', 'longtext').notNullable()
    table.boolean('ativo').notNullable()
    table.boolean('aberto').notNullable()
    table.string('data_publicacao').notNullable()

    table.integer('id_usuario')
      .unsigned().notNullable() 
      .references('id_usuario').inTable('usuarios')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('topicos_comunidade')
}