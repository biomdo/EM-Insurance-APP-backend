import env from 'dotenv'

env.config()

const dbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DATABASE,
  // dialect: 'mariadb', //Default dialect on debian server with MariaDB on Debian
  dialect: 'mysql', //Testing on Windows machine
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}

export default dbConfig
