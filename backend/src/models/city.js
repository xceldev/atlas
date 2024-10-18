const { DataTypes, Model } = require('sequelize')

const sequelize = require('../config/database')

const Region = require('./region')

class City extends Model {}

City.init({
  name: {
    type: DataTypes.STRING
  },
  code: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'city'
})

City.belongsTo(Region)

module.exports = City