import express from 'express'
import { userController } from '../controllers/user.controller'
import { isAuthenticated } from '../middleware/authorization.middleware'

const router = express.Router()

router.get('/', isAuthenticated, userController.getAllUsers)
//[ ] Por una cuestion de seguridad se utiliza post para evitar que queden logs y registros del username
router.post('/username', isAuthenticated, userController.getUserByUsername) 
router.post('/', userController.createUser)
router.put('/', userController.updateUser)
router.post('/login', userController.login)

export default router