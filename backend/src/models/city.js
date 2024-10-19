const { DataTypes, Model } = require('sequelize')

const sequelize = require('../config/database')

const Region = require('./region')

class City extends Model {}

City.init({
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
  modelName: 'city'
})

City.belongsTo(Region, {
  foreignKey: {
    allowNull: false
  }
})

module.exports = City