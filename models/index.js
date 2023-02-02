import dbConfig from '../config/index.js'
import Sequelize from 'sequelize'

import UserModel from './user_model.js'
import ProductModel from './product_model.js'
import ClientModel from './client_model.js'
import BeneficiaryModel from './beneficiary_model.js'
import BankDetailsModel from './bank_details_model.js'
import ClientProductModel from './client_product_model.js'

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    timestamps: true,
    freezeTableName: true,
  },
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// the db models
db.users = UserModel(sequelize, Sequelize)
db.products = ProductModel(sequelize, Sequelize)
db.clients = ClientModel(sequelize, Sequelize)
db.benefitiaries = BeneficiaryModel(sequelize, Sequelize)
db.bankDetails = BankDetailsModel(sequelize, Sequelize)
db.clientProducts = ClientProductModel(sequelize, Sequelize)

export default db
