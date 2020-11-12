import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('notificacoes', table => {
    table.increments('id_notificacao').primary()
    table.string('conteudo').notNullable()

    table.integer('id_usuario')
      .unsigned().notNullable()
      .references('id_usuario').inTable('usuarios')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('notificacoes')
}