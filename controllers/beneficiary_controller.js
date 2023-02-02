import db from '../models/index.js'

const Op = db.Sequelize.Op //sequelize operation --like,regexp etc

const Beneficiary = db.benefitiaries

export const create = (req, res) => {
  //Validate Beneficiary Details
  if (!req.body.client_id) {
    res.status(200).json({ message: 'Client not provided.', isError: true })
    return
  }
  if (!req.body.first_name) {
    res.status(200).json({ message: 'First name not provided.', isError: true })
    return
  }
  if (!req.body.last_name) {
    res.status(200).json({ message: 'Last name not provided.', isError: true })
    return
  }
  if (!req.body.relation) {
    res.status(200).json({ message: 'Relation not provided.', isError: true })
    return
  }

  //Save Beneficiary to DB
  const beneficiary = { ...req.body }
  Beneficiary.create(beneficiary)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error adding beneficiary.',
      })
      console.log(error.message)
    })
}

export const findOne = async (req, res) => {
  const id = req.params.id
  await Beneficiary.findByPk(id)
    .then((data) => {
      if (data) res.status(200).json(data)
      else res.json({ message: 'No Beneficiary record found', isError: true })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Server errror encoutered when retrieving beneficiary record.',
      })
    })
}

export const findAll = async (req, res) => {
  await Beneficiary.findAll()
    .then((data) => {
      if (data) res.status(200).json(data)
      else res.json({ message: 'No Beneficiary record found' })
    })
    .catch((error) => {
      res.status(500).json({
        message:
          'Server errror encoutered when retrieving beneficiary records.',
      })
    })
}

export const findAllClientBeneficiaries = async (req, res) => {
  const clientId = req.params.id
  await Beneficiary.findAll({ where: { client_id: clientId } })
    .then((data) => {
      if (data) res.status(200).json(data)
      else res.json({ message: 'No Beneficiary record found' })
    })
    .catch((error) => {
      res.status(500).json({
        message:
          'Server errror encoutered when retrieving beneficiary records.',
      })
    })
}

export const update = (req, res) => {
  const id = req.params.id
  Beneficiary.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'Beneficiary record was updated successfully.',
        })
      } else {
        res.status(200).json({
          message: `Cannot update Beneficiary record`,
          isError: true,
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error encountered when updating Beneficiary record. `,
      })
      console.log(error.message)
    })
}
