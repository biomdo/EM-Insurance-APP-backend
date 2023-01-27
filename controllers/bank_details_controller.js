import db from '../models/index.js'

const Op = db.Sequelize.Op //sequelize operation --like,regexp etc

const BankDetails = db.bankDetails

export const create = async (req, res) => {
  //Validate Bank Details
  if (!req.body.client_id) {
    res.status(200).json({ message: 'Client not provided.' })
    return
  }
  if (!req.body.bank_name) {
    res.status(200).json({ message: 'Bank name not provided.' })
    return
  }
  if (!req.body.branch) {
    res.status(200).json({ message: 'Bank branch name not provided.' })
    return
  }
  if (!req.body.account_name) {
    res.status(200).json({ message: 'Account name not provided.' })
    return
  }
  if (!req.body.account_number) {
    res.status(200).json({ message: 'Account number not provided.' })
    return
  }

  //Save Bank Details to DB
  const bankDetails = { ...req.body }

  BankDetails.create(bankDetails)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(400).json({
        message: 'Error adding bank Details.',
      })
      console.log(error.message)
    })
}

//Check if Primary bank accout exists -- functionality can be added later
/*const checkIfPrimaryAccountExists = async (id) => {
  const clientId = id
  let result = []
  await BankDetails.find({ primary: true }, { where: { client_id: clientId } })
    .then((data) => {
      result = data
      return result
    })
    .catch((error) => {
      console.log(error)
      return result
    })
}*/

//Get Client All Client Bank details
export const findAllClientBankDetails = async (req, res) => {
  const clientId = req.params.id
  await BankDetails.findAll({ where: { client_id: clientId } })
    .then((data) => {
      if (data) res.status(200).json(data)
      else res.json({ message: 'No bank details found.' })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Internal Server error encoutered while fetching bank details',
      })
      console.log(error)
    })
}

//Get Bank Details using ID
export const findOne = async (req, res) => {
  const id = req.params.id
  await BankDetails.findByPk(id)
    .then((data) => {
      if (data) res.status(200).json(data)
      else res.json({ message: 'Account details not found found' })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Server errror encoutered when retrieving account details.',
      })
    })
}

//Update client account details
export const update = (req, res) => {
  const id = req.params.id
  BankDetails.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'Account details updated successfully.',
        })
      } else {
        res.status(400).json({
          message: `Cannot update account details`,
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error encountered when updating account details. `,
      })
      console.log(error.message)
    })
}
