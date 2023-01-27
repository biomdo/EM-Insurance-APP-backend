import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import env from 'dotenv'
import routes from './routes/index.js'
import db from './models/index.js' //NB: Throws an Error if there is an empty model file in models dir

const app = express()

//To work with .env file in root folder
env.config()

//APP Setup
// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: '30mb', extended: true }))
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// set port, listen for requests
const PORT = process.env.PORT

//Setting Time Zone
process.env.TZ = 'Africa/Nairobi'

//Sync with Server|Database
db.sequelize.sync()

//Routes Setup
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.SERVER_URL} port ${PORT}.`) //Check whether server is running
})
