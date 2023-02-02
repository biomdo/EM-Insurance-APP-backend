import express from 'express'
import {
  create,
  findOne,
  findAll,
  findAllClientBeneficiaries,
  update,
} from '../controllers/beneficiary_controller.js'

const beneficiaryRouter = express.Router()

//Add Beneficiary
beneficiaryRouter.post('/', create)

//Find beneficiary by ID
beneficiaryRouter.get('/:id', findOne)

//Find all benefitiaries
beneficiaryRouter.get('/', findAll)

//Find all client Beneficiaries
beneficiaryRouter.get('/client/:id', findAllClientBeneficiaries)

//Update beneficiary record
beneficiaryRouter.put('/:id', update)

export default beneficiaryRouter
