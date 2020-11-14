import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('usuarios', table => {
    table.increments('id_usuario').primary()
    table.string('nome').notNullable()
    table.string('email').notNullable().unique()
    table.string('senha').notNullable()
    table.string('foto_perfil')
    table.string('pergunta_seguranca', 20)
    table.string('resposta', 20) 
    table.string('texto_perfil', 200) 
    table.string('capa_perfil')
    table.string('data_entrada').notNullable()
    
    table.integer('id_tipo')
      .unsigned().notNullable()
      .references('id_tipo').inTable('tipo_usuario')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('usuarios')
}