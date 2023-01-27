import express from 'express'
import {
  create,
  findAll,
  findByUsername,
  findOne,
  update,
  changePassword,
  authenticateUser,
  authenticateUserToken,
} from '../controllers/user_controller.js'

const userRouter = express.Router()

// Create a new User
userRouter.post('/', create)

// Retrieve all Users
userRouter.get('/', findAll)

// Retrieve User by username
userRouter.get('/username/:username', findByUsername)

// Authenticate/Login User
userRouter.post('/authenticate/', authenticateUser)

// Authenticate User JWT
userRouter.post('/jwt/', authenticateUserToken)

// Retrieve a single User using id key
userRouter.get('/:id', findOne)

// Update a User using id key
userRouter.put('/:id', update)

// Change user password
userRouter.put('/password/:id', changePassword)

export default userRouter
