import express from 'express'
import bodyParser from 'express'
import morgan from 'morgan'
import jwt from 'jsonwebtoken'
import cors from 'cors'

import { config } from './config/secret'
import { verifyToken } from './middleware/verifyToken'

const app = express()

app.use(bodyParser.json())
app.use(morgan('short'))
app.use(cors())

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

app.get('/api', verifyToken, (req, res) => {
  jwt.verify(req.token, config.secretKey, (err, data) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json({
        token: req.token,
        message: 'Hello'
      })
    }
  })
})

app.post('/api/login', (req, res) => {
  jwt.sign(req.body, config.secretKey, { expiresIn: '30s' }, (err, token) => {
    res.json({ token })
  })
})

app.listen(process.env.PORT, () =>
  console.log(`Server listening: ${process.env.PORT}`)
)
