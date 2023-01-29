import { DOUBLE } from 'sequelize'
import db from '../models/index.js'

const Op = db.Sequelize.Op //sequelize operation --like,regexp etc

const Product = db.products
const ClientProduct = db.clientProducts
const Client = db.clients

export const create = (req, res) => {
  //Validate Product
  if (!req.body.name) {
    res.status(200).json({
      message: 'Insurance Product name is not provided.',
      isError: true,
    })
    return
  }
  if (!req.body.period) {
    res.status(200).json({
      message: 'Insurance Product period is not provided.',
      isError: true,
    })
    return
  }
  if (!req.body.amount) {
    res.status(200).json({
      message: 'Insurance Product amount is not provided.',
      isError: true,
    })
    return
  }

  const product = { ...req.body }

  //Save Product to DB
  Product.create(product)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Insurance Product already exists.',
      })
      console.log(error.message)
    })
}

//Retrieve all product records
export const findAll = async (req, res) => {
  await Product.findAll({ where: { status: { [Op.ne]: 'deleted' } } })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(500).json({
        message:
          'Database error encountered while retrieving Insurance Products from storage.',
      })
      console.log(error.message)
    })
}

//Retrieve product record using the name
export const findByName = async (req, res) => {
  const name = req.params.name
  await Product.findAll({ where: { name: name } })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(500).json({
        message:
          'Database error encountered while retrieving Insurance Product from storage.',
      })
      console.log(error.message)
    })
}

//Retrieve product record using the primary key
export const findOne = (req, res) => {
  const id = req.params.id
  Product.findByPk(id)
    .then((data) => {
      if (data) res.status(200).json(data)
      else res.json({ message: `Insurance product not found.`, isError: true })
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error enctounered in retrieving Insurance product.`,
      })
      console.log(error.message)
    })
}

//Update product record
export const update = (req, res) => {
  const id = req.params.id

  Product.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'Insurance product record was updated successfully.',
        })
      } else {
        res.status(200).json({
          message: `Cannot update Insurance product record`,
          isError: true,
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error encountered when updating Insurance product record. `,
      })
      console.log(error.message)
    })
}

//Soft delete a product -- marks it as deleted in the status field but does not completely remove it from DB
export const deleteProduct = (req, res) => {
  const id = req.params.id

  Product.update(
    { status: 'deleted' }, //Consider also chamging the product name (add a prefix deleted) since the column is marked as unique.
    { where: { id: id } }
  )
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'Insurance product record was deleted successfully.',
        })
      } else {
        res.status(200).json({
          message: `Cannot delete Insurance product as it does not exist`,
          isError: true,
        })
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: `Error encountered when updating product record. ` })
      console.log(error.message)
    })
}

export const findAllClientProductsbyProductId = async (req, res) => {
  const productId = req.params.id
  await ClientProduct.findAll({ where: { product_id: productId } })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(500).json({
        message:
          'Database error encountered while retrieving Insurance Products from storage.',
      })
      console.log(error.message)
    })
}
