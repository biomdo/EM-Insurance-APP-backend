import express from 'express'
import env from 'dotenv'

import userRoutes from './user_routes.js'
import productRoutes from './product_routes.js'
import clientRoutes from './client_routes.js'
import beneficiaryRoutes from './beneficiary_routes.js'
import bankDetailsRoutes from './bank_details_routes.js'
import clientProductRoutes from './client_product_routes.js'

env.config()
const router = express.Router()

router.get('/', (req, res) => {
  res.send(`<h1>E&M Insuarance API</a>`)
})

router.use(`/user`, userRoutes)
router.use('/product', productRoutes)
router.use('/client', clientRoutes)
router.use('/beneficiary', beneficiaryRoutes)
router.use('/bankdetails', bankDetailsRoutes)
router.use('/clientproduct', clientProductRoutes)

export default router
