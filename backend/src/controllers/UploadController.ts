import { Request, Response } from 'express'

class UploadController {
  public store = async (req: Request, res: Response) => {
    const { filename } = req.file;

    return res.status(201).json({url: `http://localhost:3333/uploads/${filename}`})
  }
}

export default new UploadController()
