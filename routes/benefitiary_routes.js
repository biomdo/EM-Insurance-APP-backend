import express from 'express'
import {
  create,
  findOne,
  findAll,
  findAllClientBenefitiaries,
  update,
} from '../controllers/benefitiary_controller.js'

const benefitiaryRouter = express.Router()

//Add Benefitiary
benefitiaryRouter.post('/', create)

//Find benefitiary by ID
benefitiaryRouter.get('/:id', findOne)

//Find all benefitiaries
benefitiaryRouter.get('/', findAll)

//Find all client Benefitiaries
benefitiaryRouter.get('/client/:id', findAllClientBenefitiaries)

//Update benefitiary record
benefitiaryRouter.put('/:id', update)

export default benefitiaryRouter
