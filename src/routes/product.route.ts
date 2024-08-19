import express from 'express'
import { productController } from '../controllers/product.controller'

import { upload } from '../config/upload'

const router = express.Router()


router.get('/', productController.getAllProducts)
router.post('/', upload.single('image'), productController.createProduct)
router.get('/outstanding', productController.getProductsWithOutstanding)
router.put('/', upload.single('image'), productController.updateProduct)
router.delete('/:id', productController.removeProduct)
router.post('/dmany', productController.removeManyProducts)

export default router;
