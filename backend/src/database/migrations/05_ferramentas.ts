import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('ferramentas', table => {
    table.increments('id_ferramenta').primary()
    table.string('descritivo').notNullable()
    table.string('icone').notNullable()

    table.integer('id_categoria')
      .unsigned().notNullable()
      .references('id_categoria').inTable('categorias')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('ferramentas')
}