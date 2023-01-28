import express from 'express'
import {
  create,
  findAll,
  findOne,
  findByName,
  update,
  deleteProduct,
  findAllClientProductsbyProductId,
} from '../controllers/product_controller.js'

const productRouter = express.Router()

//Create new product
productRouter.post('/', create)

//Find all active products
productRouter.get('/', findAll)

//Find a product by its ID
productRouter.get('/:id', findOne)

//Find a product by its name
productRouter.get('/:name', findByName)

//Update product record
productRouter.put('/:id', update)

//Delete a product
productRouter.put('/delete/:id', deleteProduct)

//Find product client products for a particular inurance product
productRouter.get('/clientproducts/:id', findAllClientProductsbyProductId)

export default productRouter
