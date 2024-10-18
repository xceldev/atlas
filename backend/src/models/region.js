const { DataTypes, Model } = require('sequelize')

const sequelize = require('../config/database')

const Country = require('./country')

class Region extends Model {}

Region.init({
  name: {
    type: DataTypes.STRING
  },
  code: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'region'
})

Region.belongsTo(Country)

module.exports = Region