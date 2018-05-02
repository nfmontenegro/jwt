import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../models/user'

import { config } from '../config/secret'
import { verifyToken } from '../middleware/verifyToken'

const router = express.Router()

const { secretKey } = config

const saltRounds = 10

router.get('/', verifyToken, (req, res) => {
  const { token } = req
  jwt.verify(token, secretKey, (err, data) => {
    if (err) {
      res.sendStatus(403)
    } else {
      User.find()
        .then(users => res.json({ count: users.length, users }))
        .catch(e => e)
    }
  })
})

router.post('/register', (req, res) => {
  User.find({ email: req.body.email })
    .then(user => {
      if (user.length) {
        res.json({
          isRegistered: true,
          msg: `user ${req.body.email} is registered!`
        })
      } else {
        bcrypt
          .hash(req.body.password, saltRounds)
          .then(passwordCrypt => {
            console.log(passwordCrypt)
            req.body.password = passwordCrypt
            const user = new User(req.body)
            user.save()

            res.json({
              isRegistered: false,
              msg: `user ${req.body.name} succesfully registered!`,
              user: req.body
            })
          })
          .catch(e => e)
      }
    })
    .then(e => e)
})

router.post('/login', (req, res) => {
  const { email, password } = req.body

  jwt.sign(req.body, secretKey, { expiresIn: '1h' }, (err, token) => {
    if (err) {
      res.sendStatus(500)
    } else {
      User.find({ email })
        .then(user => {
          if (user.length) {
            bcrypt
              .compare(password, user[0].password)
              .then(password => {
                if (password) {
                  res.json({
                    isAuthenticated: true,
                    msg: `user ${email} authenticated`,
                    user: req.body,
                    token
                  })
                } else {
                  res.json({
                    isAuthenticated: false,
                    msg: 'password incorrect'
                  })
                }
              })
              .catch(e => e)
          } else {
            res.json({
              isAuthenticated: false,
              msg: `this user ${email} is not registered`
            })
          }
        })
        .catch(e => e)
    }
  })
})

export default router
