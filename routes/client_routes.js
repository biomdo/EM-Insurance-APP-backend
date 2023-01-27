import express from 'express'
import {
  create,
  findOne,
  findAllClients,
  update,
  deleteClient,
  findClientBenefitiary,
  findClientProducts,
} from '../controllers/client_controller.js'

const clientRouter = express.Router()

//Create new client
clientRouter.post('/', create)

//Find client by ID (primary Key)
clientRouter.get('/:id', findOne)

//Find all client records
clientRouter.get('/', findAllClients)

//Update Client record
clientRouter.put('/:id', update)

//Delete client record
clientRouter.put('/delete/:id', deleteClient)

//Find client benefitiaries
clientRouter.get('/benefitiary/:id', findClientBenefitiary)

//find client products
clientRouter.get('/products/:id', findClientProducts)

export default clientRouter
