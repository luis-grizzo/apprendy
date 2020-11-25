import { Request, Response } from 'express'

import RespostaModel from '../../models/CommunityModel/RespostaModel'

class VotoController {
  private _model = new RespostaModel()

  public store = async (req: Request, res: Response) => {
    const { id_resposta } = req.params

    if(!Number(id_resposta)) return res.status(400).json({ error: 'Bad request' })

    const existResposta = await this._model.existResposta(Number(id_resposta))

    if(!existResposta) return res.status(404).json({ error: "Commentary not Found!" })

    const votos = await this._model.increaseVoto(Number(id_resposta))
    
    return res.json(votos)
  }

  public delete = async (req: Request, res: Response) => {
    const { id_resposta } = req.params

    if(!Number(id_resposta)) return res.status(400).json({ error: 'Bad request' })

    const votos = await this._model.decreaseVoto(Number(id_resposta))
    
    return res.json(votos)
  }
}

export default new VotoController()