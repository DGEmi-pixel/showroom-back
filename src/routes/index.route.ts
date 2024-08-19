import express from 'express'
import productRouter from './product.route'
import contactRoute from './contact.route'
import userRoute from './user.route'
import aboutRoute from './about.route'
import showroomRoute from './showroom.route'

const router = express.Router()

router.use('/user', userRoute)
router.use('/product', productRouter)
router.use('/contact', contactRoute)
router.use('/about', aboutRoute)
router.use('/showroom', showroomRoute)

export default router
