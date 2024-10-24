const bcrypt = require('bcrypt')
const hashPassword = require('../services/helpers/user/hash-password')

const generatePassword = (password) => {
  const saltRounds = 16
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(password, salt)
  return hashedPassword
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'atlas.admin',
        password: generatePassword('$atL@s.adM1n!'),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}