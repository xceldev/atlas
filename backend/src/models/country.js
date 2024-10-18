const { DataTypes, Model } = require('sequelize')

const sequelize = require('../config/database')

class Country extends Model {}

Country.init({
  name: {
    type: DataTypes.STRING
  },
  code: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'country'
})

module.exports = Country