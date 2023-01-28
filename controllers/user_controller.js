import db from '../models/index.js'

import emailValidator from 'email-validator'
import sha1 from 'js-sha1'
import authenticate from '../config/auth.js'
import jwt from 'jsonwebtoken'

const User = db.users
const Op = db.Sequelize.Op //sequelize operation --like,regexp etc

export const create = (req, res) => {
  //Validate User
  if (!req.body.username) {
    res.status(400).json({ message: 'Username not provided.' })
    return
  }
  if (!req.body.first_name) {
    res.status(400).json({ message: 'First name not provided.' })
    return
  }
  if (!req.body.last_name) {
    res.status(400).json({ message: 'Last name not provided.' })
    return
  }
  if (!req.body.email) {
    res.status(400).json({ message: 'Email not provided.' })
  }
  if (!emailValidator.validate(req.body.email)) {
    res.status(400).json({ message: 'Invalid email address.' })
    return
  }
  if (!req.body.password) {
    res.status(400).json({ message: 'Password not provided.' })
    return
  }

  //Format username, email and hash password
  const username = req.body.username.toLowerCase().trim()
  const email = req.body.email.toLowerCase().trim()
  const hashedPassword = sha1(req.body.password)

  //Create User
  const user = { ...req.body }
  user.username = username
  user.email = email
  user.password = hashedPassword

  //Save User to DB
  User.create(user)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(400).json({
        message: 'Username is already in use.',
      })
      console.log(error.message)
    })
}

//Retrieve all user records
export const findAll = async (req, res) => {
  await User.findAll()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error encountered while retrieving users from storage.',
      })
      console.log(error.message)
    })
}

//Retrieve user record using the username
export const findByUsername = async (req, res) => {
  const username = req.params.username
  await User.findAll({ where: { username: username } })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error encountered while retrieving user from storage.',
      })
      console.log(error.message)
    })
}

//Retrieve user record using the primary key
export const findOne = (req, res) => {
  const id = req.params.id
  User.findByPk(id)
    .then((data) => {
      if (data) res.status(200).json(data)
      else res.json({ message: `User with id ${id} not found.` })
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error retrieving user with id ${id}.`,
      })
      console.log(error.message)
    })
}

//Update user record
export const update = (req, res) => {
  const id = req.params.id

  User.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'User record was updated successfully.',
        })
      } else {
        res.status(400).json({
          message: `Cannot update user as record does not exist.`,
        })
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: `Error encountered when updating user record.` })
      console.log(error.message)
    })
}

//Change user password -- overkill since there is already update record functionality but necessary for API documentation
export const changePassword = (req, res) => {
  const id = req.params.id
  if (!req.body.password) {
    res.json({ message: 'New password not provided.' })
    return
  }
  const password = req.body.password
  const hashedPassword = sha1(password)

  User.update({ password: hashedPassword }, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'Password successfully updated.',
        })
      } else {
        res.status(400).json({
          message: `User does not exist`,
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: `Internal Server Error encountered while tyring to update password`,
      })
      console.log(error.message)
    })
}

//Check user login credentials
export const authenticateUser = (req, res) => {
  //Validate inputs
  if (!req.body.username) {
    res.status(400).json({ message: 'Username not provided.' })
    return
  }
  if (!req.body.password) {
    res.status(400).json({ message: 'Password not provided.' })
    return
  }

  const username = req.body.username
  const hashedPassword = sha1(req.body.password)

  User.findAll({
    where: {
      username: { [Op.like]: `${username}` },
      password: { [Op.like]: `${hashedPassword}` },
    },
  })
    .then((data) => {
      var user = [...data]
      if (user.length !== 0) {
        if (user[0].status !== 'active') {
          res.status(400).json({
            error: true,
            message:
              'Your account has been '.concat(user[0].status) +
              '. Please contact the office.',
          })
        } else {
          //Replace APIKeyYangu with actual keys given to diff organizations/clients
          var token = jwt.sign({ user: user }, 'APIKeyYangu', {
            expiresIn: 604800, //Expires in 7 days
          })
          res.status(200).json({ error: false, auth: true, token: token })
        }
      } else {
        res.status(200).json({
          error: true,
          message: 'Invalid credentials. Please try again.',
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Internal Server Error. Please try again.',
      })
      console.log(error.message)
    })
}

//Authenticate user json web token for subsequent logins --to assist reduce the need to enter credentials every time
export const authenticateUserToken = (req, res) => {
  const userAuth = authenticate(req)
  res.status(userAuth.status).json({
    auth: userAuth.auth,
    message: userAuth.message,
    userData: userAuth.data,
  })
}
