import express from 'express'
import bodyParser from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'

import user from './routes/user'

const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}
const DB = process.env.MONGODB
const PORT = process.env.PORT

mongoose.connect(DB)

app.use(bodyParser.json())
app.use(morgan('short'))
app.use(cors())

app.use('/api', user)

app.listen(PORT, () => console.log(`Server listening: ${PORT} 🚀`))

export default app
