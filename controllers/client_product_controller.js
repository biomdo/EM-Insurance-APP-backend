import db from '../models/index.js'

const Op = db.Sequelize.Op //sequelize operation --like,regexp etc

const ClientProduct = db.clientProducts
const Product = db.products

export const create = async (req, res) => {
  //Validate Client Product
  if (!req.body.client_id) {
    res.status(200).json({ message: 'Client not provided.', isError: true })
    return
  }
  if (!req.body.product_id) {
    res
      .status(200)
      .json({ message: 'Insurance product not provided.', isError: true })
    return
  }
  if (!req.body.start_date) {
    res
      .status(200)
      .json({ message: 'Product start date not provided.', isError: true })
    return
  }

  const clientProduct = { ...req.body }

  //Get product period
  let product = []
  await Product.findByPk(clientProduct.product_id).then((data) => {
    if (!data) {
      res
        .status(200)
        .json({ message: 'Insurance Product does not exist.', isError: true })
      return
    } else {
      product = data
    }
  })

  //genetare end date
  let endDate = new Date(clientProduct.start_date)
  endDate.setDate(endDate.getDate() + product.period)
  clientProduct.end_date = endDate

  //Add client product to DB
  ClientProduct.create(clientProduct)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error adding Client Product.',
        isError: true,
      })
      console.log(error.message)
    })
}

//Get Client Product using ID
export const findOne = async (req, res) => {
  const id = req.params.id
  await ClientProduct.findByPk(id)
    .then((data) => {
      if (data) res.status(200).json(data)
      else
        res.json({ message: 'Client Product not found found', isError: true })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Server errror encoutered when retrieving Client product.',
      })
    })
}

//Get All Client Products
export const findAll = async (req, res) => {
  await ClientProduct.findAll({ where: { status: 'active' } })
    .then((data) => {
      if (data) res.status(200).json(data)
      else res.json({ message: 'Client Products not found found' })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Server errror encoutered when retrieving Client product.',
      })
      console.log(error)
    })
}

//Update client product details
export const update = (req, res) => {
  const id = req.params.id
  ClientProduct.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'Client product updated successfully.',
        })
      } else {
        res.status(200).json({
          message: `Cannot update client product`,
          isError: true,
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error encountered when updating client product. `,
      })
      console.log(error.message)
    })
}

//Soft delete all client products with product ID
export const deleteByProductId = (req, res) => {
  const id = req.params.id
  ClientProduct.update({ satus: 'deleted' }, { where: { product_id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'Client product deleted successfully.',
        })
      } else {
        res.status(200).json({
          message: `Cannot delete client product`,
          isError: true,
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error encountered when deleting client product. `,
      })
      console.log(error.message)
    })
}
