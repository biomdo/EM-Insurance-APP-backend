import express from 'express'
import {
  create,
  findOne,
  findAll,
  update,
} from '../controllers/client_product_controller.js'

const clientProductRouter = express.Router()

//Add client product
clientProductRouter.post('/', create)

//find one client product by Id
clientProductRouter.get('/:id', findOne)

//find all client products
clientProductRouter.get('/', findAll)

//Update client products
clientProductRouter.put('/:id', update)

export default clientProductRouter
