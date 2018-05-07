import express from 'express'
import { registerUser, loginUser, getUsers } from '../controllers/user'
import { verifyToken } from '../middleware/verifyToken'

const router = express.Router()

router.get('/', verifyToken, getUsers)

router.post('/register', registerUser)

router.post('/login', loginUser)

export default router
