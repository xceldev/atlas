const { DataTypes, Model } = require('sequelize')

const sequelize = require('../config/database')

const User = require('./user')

class Session extends Model {}

Session.init({
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  startedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  endedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'session'
})

Session.belongsTo(User, {
  foreignKey: {
    allowNull: false
  }
})

module.exports = Session