const dotenv = require('dotenv')
const path = require('path')
const Sequelize = require('sequelize')

dotenv.config()

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_DIALECT
} = process.env

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASS,
  {
    dialect: DB_DIALECT,
    host: path.resolve('.', DB_HOST)
  }
)

module.exports = sequelize