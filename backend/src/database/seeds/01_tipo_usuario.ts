import Knex from 'knex'


export async function seed (knex: Knex) {
  await knex('tipo_usuario').insert([
    { descritivo: 'Comum' },
    { descritivo: 'Administrador' },
    { descritivo: 'Moderador' },
  ])
}