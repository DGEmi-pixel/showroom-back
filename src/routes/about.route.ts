import express from 'express'
import { aboutController } from '../controllers/about.controller'
import { isAuthenticated } from '../middleware/authorization.middleware'

const router = express.Router()

router.get('/', aboutController.getAbout)
router.post('/', isAuthenticated, aboutController.updateAbout)

export default router