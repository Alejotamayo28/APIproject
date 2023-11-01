import { Router } from 'express'
import { getProducts, getProductsbyId, createProduct, updateProducts, deleteProducts } from '../controllers/products.controllers'
import { validateCreateProduct, validateIdProduct, validateUpdateProduct } from '../validators/products'

const router = Router()

router.get('/products', getProducts)
router.get('/products/:id', validateIdProduct, getProductsbyId)
router.post('/products', validateCreateProduct, createProduct)
router.put('/products/:id', validateUpdateProduct, updateProducts)
router.delete('/products/:id', deleteProducts)

export default router
