import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('respostas_topico', table => {
    table.increments('id_resposta_topico').primary()
    table.text('conteudo', 'longtext').notNullable()
    table.string('data_publicacao').notNullable()

    table.integer('id_usuario')
      .unsigned().notNullable()
      .references('id_usuario').inTable('usuarios')
    
    table.integer('id_topico_comunidade')
      .unsigned().notNullable()
      .references('id_topico_comunidade').inTable('topicos_comunidade')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('respostas_topico')
}