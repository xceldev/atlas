const bcrypt = require('bcrypt')
const { DataTypes, Model } = require('sequelize')

const sequelize = require('../config/database')

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    get: () => {
      return '<classified content>'
    }
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'user'
})

module.exports = User