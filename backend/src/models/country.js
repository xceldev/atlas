const { DataTypes, Model } = require('sequelize')

const sequelize = require('../config/database')

class Country extends Model {}

Country.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isAlpha: true,
      isUppercase: true,
      len: 3
    }
  }
}, {
  sequelize,
  modelName: 'country'
})

module.exports = Country