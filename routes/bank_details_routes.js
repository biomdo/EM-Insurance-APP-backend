import express from 'express'
import {
  create,
  findAllClientBankDetails,
  findOne,
  update,
} from '../controllers/bank_details_controller.js'

const bankDetailsRouter = express.Router()

//Add bank details
bankDetailsRouter.post('/', create)

//find one by id
bankDetailsRouter.get('/:id', findOne)

//find all client Bank details
bankDetailsRouter.get('/client/:id', findAllClientBankDetails)

//Update bank details
bankDetailsRouter.put('/:id', update)

export default bankDetailsRouter
