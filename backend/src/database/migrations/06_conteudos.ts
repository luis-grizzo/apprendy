import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('conteudos', table => {
    table.increments('id_conteudo').primary()
    table.string('titulo').notNullable()
    table.string('imagem').notNullable()
    table.string('descricao').notNullable()
    table.text('conteudo', 'longtext').notNullable()
    table.boolean('ativo').notNullable()
    table.string('data_publicacao').notNullable()

    table.integer('id_usuario')
      .unsigned().notNullable()
      .references('id_usuario').inTable('usuarios')
    
    table.integer('id_ferramenta').unsigned()
      .references('id_ferramenta').inTable('ferramentas')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('conteudos')
}
  