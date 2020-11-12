import jwt from 'jsonwebtoken'

import { hash, options } from '../auth/configs/tokenConfig.json'

function GenerateToken (id: number) {
  const token = jwt.sign({ id }, hash, options)

  return token
}

export default GenerateToken