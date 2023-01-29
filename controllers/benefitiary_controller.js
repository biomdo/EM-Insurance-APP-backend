import db from '../models/index.js'

const Op = db.Sequelize.Op //sequelize operation --like,regexp etc

const Benefitiary = db.benefitiaries

export const create = (req, res) => {
  //Validate Benefitiary Details
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

  //Save Benefitiary to DB
  const benefitiary = { ...req.body }
  Benefitiary.create(benefitiary)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error adding benefitiary.',
      })
      console.log(error.message)
    })
}

export const findOne = async (req, res) => {
  const id = req.params.id
  await Benefitiary.findByPk(id)
    .then((data) => {
      if (data) res.status(200).json(data)
      else res.json({ message: 'No Benefitiary record found', isError: true })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Server errror encoutered when retrieving benefitiary record.',
      })
    })
}

export const findAll = async (req, res) => {
  await Benefitiary.findAll()
    .then((data) => {
      if (data) res.status(200).json(data)
      else res.json({ message: 'No Benefitiary record found' })
    })
    .catch((error) => {
      res.status(500).json({
        message:
          'Server errror encoutered when retrieving benefitiary records.',
      })
    })
}

export const findAllClientBenefitiaries = async (req, res) => {
  const clientId = req.params.id
  await Benefitiary.findAll({ where: { client_id: clientId } })
    .then((data) => {
      if (data) res.status(200).json(data)
      else res.json({ message: 'No Benefitiary record found' })
    })
    .catch((error) => {
      res.status(500).json({
        message:
          'Server errror encoutered when retrieving benefitiary records.',
      })
    })
}

export const update = (req, res) => {
  const id = req.params.id
  Benefitiary.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'Benefitiary record was updated successfully.',
        })
      } else {
        res.status(200).json({
          message: `Cannot update Benefitiary record`,
          isError: true,
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error encountered when updating Benefitiary record. `,
      })
      console.log(error.message)
    })
}
