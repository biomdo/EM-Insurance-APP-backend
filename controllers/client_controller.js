import db from '../models/index.js'

const Op = db.Sequelize.Op //sequelize operation --like,regexp etc

const Client = db.clients
const ClientProduct = db.clientProducts
const Product = db.products
const Benefitiary = db.benefitiaries

export const create = (req, res) => {
  //Validate Client
  if (!req.body.first_name) {
    res.status(200).json({ message: 'First name not provided.', isError: true })
    return
  }
  if (!req.body.last_name) {
    res.status(200).json({ message: 'Last name not provided.', isError: true })
    return
  }
  if (!req.body.id_number) {
    res.status(200).json({ message: 'ID number not provided.', isError: true })
    return
  }

  const client = { ...req.body }
  //Save client to DB
  Client.create(client)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(200).json({
        message: `Client with ID number: ${client.id_number} record already exists.`,
        isError: true,
      })
      console.log(error.message)
    })
}

//Retrieve all client records
export const findAllClients = async (req, res) => {
  await Client.findAll({ where: { status: { [Op.ne]: 'deleted' } } })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(500).json({
        message:
          'Database error encountered while retrieving clients from storage.',
      })
      console.log(error.message)
    })
}

//Retrieve client record by ID
export const findOne = async (req, res) => {
  const id = req.params.id
  await Client.findByPk(id)
    .then((data) => {
      if (data) res.status(200).json(data)
      else res.json({ message: `Client record not found.`, isError: true })
    })
    .catch((error) => {
      res.status(500).json({
        message:
          'Database error encountered while retrieving clients from storage.',
      })
      console.log(error.message)
    })
}

//Update Client record
export const update = (req, res) => {
  const id = req.params.id
  Client.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'Client record was updated successfully.',
        })
      } else {
        res.status(200).json({
          message: `Cannot update Client record`,
          isError: true,
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error encountered when updating Client record. `,
      })
      console.log(error.message)
    })
}

//Soft Delete client Record
export const deleteClient = (req, res) => {
  const id = req.params.id
  Client.update({ status: 'deleted' }, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'Client record was deleted successfully.',
        })
      } else {
        res.status(200).json({
          message: `Cannot delete Client record`,
          isError: true,
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error encountered when deleting Client record. `,
      })
      console.log(error.message)
    })
}

//find Client Insurance products
export const findClientProducts = async (req, res) => {
  const clientId = req.params.id
  await ClientProduct.findAll({ where: { client_id: clientId } })
    .then((data) => {
      if (data) res.status(200).json(data)
      else res.json({ message: 'no Insurance Products found.', isError: true })
    })
    .catch((error) => {
      res.status(500).json({
        message:
          'Server error encountered when retrieving insurance products for client.',
      })
      console.log(error)
    })
}

//find Client Benefitiary
export const findClientBenefitiary = async (req, res) => {
  const clientId = req.params.id
  await Benefitiary.findAll({ where: { client_id: clientId } })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Server error encountered when retrieving benefitiaries',
      })
      console.log(error)
    })
}
