import express from 'express'
import path from 'path'
import cors from 'cors'

import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
app.use(routes)

app.listen(process.env.PORT || 3333)