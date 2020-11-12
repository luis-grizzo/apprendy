import { Request, Response } from 'express'

import TopicoModel from '../../models/CommunityModel/TopicoModel'

import FormatDate from '../../utils/FormatDate'
import nowDateUTC from '../../utils/nowDateUTC'

class TopicoController {
  private _topicoModel = new TopicoModel()

  public index = async (req: Request, res: Response) => {
    const { pages, order } = req.query

    let topicos = await this._topicoModel.indexTopico(Number(pages), String(order))

    topicos = topicos.map(topico => {
      topico.data_publicacao = FormatDate(topico.data_publicacao)
      
      return topico
    })

    return res.json(topicos)
  }

  public store = async (req: Request, res: Response) => {
    let { userId } = req.userSession
    let { titulo, conteudo } = req.body
    
    if(!titulo || !conteudo) 
      return res.status(401).json({ error: 'Please, inform all data' })

    const data = this.factoryContent(titulo, userId, conteudo)

    try {
      const id = await this._topicoModel.createTopico(data)

      return res.json({ id, ...data })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  }

  public update = async (req: Request, res: Response) => {
    let { userId } = req.userSession
    const { id_topico_comunidade } = req.params
    let { titulo, conteudo, aberto, ativo } = req.body

    const data = {
      titulo,
      conteudo,
      aberto: Boolean(aberto),
      ativo: Boolean(ativo)
    }

    const existsTopico = await this._topicoModel.existsTopico(Number(id_topico_comunidade))

    if(!existsTopico) return res.status(404).json({ error: 'Topic not Found' })

    const where = {
      id_topico_comunidade: Number(id_topico_comunidade),
      id_usuario: userId
    }

    try {
      await this._topicoModel.updateTopico(data, where)

      return res.send("")
    } catch (e) {
      return res.status(400).json({ error: e.message })
    } 
  }

  private factoryContent(titulo: string, id_usuario: number, conteudo: string) {
    const data_publicacao = nowDateUTC()
    const ativo = true
    const aberto = true
    
    return { titulo, id_usuario, conteudo, ativo, aberto, data_publicacao }
  }
}

export default new TopicoController()