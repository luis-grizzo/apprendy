import { response } from 'express'
import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

class RespostaModel extends SimpleCRUD {
  constructor () { super('respostas_topico') }

  public existResposta = async (id_resposta_topico: number) => {
    const respostas = await this.ReadWithWhereFirst({ id_resposta_topico })

    return respostas
  }

  public increaseVoto = async (id_resposta_topico: number) => {
    const getVotosResposta = await this.ReadReturnSelectWithWhereFirst(['votos'], { id_resposta_topico })
    
    const votos = Number(getVotosResposta.votos) + 1

    await this.updateVoto(votos, id_resposta_topico)

    return { votos }
  }

  public decreaseVoto = async (id_resposta_topico: number) => {
    const getVotosResposta = await this.ReadReturnSelectWithWhereFirst(['votos'], { id_resposta_topico })
    
    const votos = Number(getVotosResposta.votos) - 1

    await this.updateVoto(votos, id_resposta_topico)

    return { votos }
  }

  private updateVoto = async (votos: number, id_resposta_topico: number) => {
    await this.Update({ votos }, { id_resposta_topico })
  }

  public createResposta = async (data: object) => {
    const id = await this.Create(data)

    return id[0]
  }

  public indexResposta = async (pages: number, order: string, id_topico_comunidade: number) => {
    if(!pages) { pages = 1 }
    if(!order) { order = 'asc' }
    
    const respostas = await knex("respostas_topico")
      .innerJoin('usuarios', 'usuarios.id_usuario', 'respostas_topico.id_usuario')
      .where('respostas_topico.id_topico_comunidade', id_topico_comunidade)
      .select([
        "respostas_topico.*",
        "usuarios.nome as usuarios_nome",
        "usuarios.foto_perfil"
      ])
      .groupBy('respostas_topico.id_resposta_topico')
      .orderBy('respostas_topico.data_publicacao', order)
      .limit(10)
      .offset((pages - 1) * 10)
    
    return respostas
  }

  public updateResposta = async (data: object, where: object) => {
    await this.Update(data, where)
  }
}

export default RespostaModel