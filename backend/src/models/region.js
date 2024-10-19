const { DataTypes, Model } = require('sequelize')

const sequelize = require('../config/database')

const Country = require('./country')

class Region extends Model {}

Region.init({
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
    validate: {
      isAlpha: true,
      isUppercase: true,
      len: [2, 3]
    }
  }
}, {
  sequelize,
  modelName: 'region'
})

Region.belongsTo(Country, {
  foreignKey: {
    allowNull: false
  }
})

module.exports = Region