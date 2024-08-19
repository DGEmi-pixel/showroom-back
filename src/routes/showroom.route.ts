import express from 'express'
import { showRoomController } from '../controllers/showroom.controller'

const router = express.Router()

router.get('/', showRoomController.getShowRoom)
router.get('/home', showRoomController.getHomeInfo)
router.get('/about', showRoomController.getAboutInfo)
router.get('/contact', showRoomController.getContactInfo)
router.post('/', showRoomController.createShowRoom)
router.put('/', showRoomController.updateShowRoom)

export default router