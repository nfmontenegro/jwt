import express from 'express'
import { registerUser, loginUser, getUsers } from '../controllers/user'

const router = express.Router()

const { secretKey, saltRound } = config

router.get('/', verifyToken, getUsers)

router.post('/register', registerUser)

router.post('/login', loginUser)

export default router
