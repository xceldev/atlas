const bcrypt = require('bcrypt')

const { SALT_ROUNDS } = require('./constants')

module.exports = (password) => {
  try {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
  } catch (error) {
    console.log(error)
    throw new Error('Internal server error!')
  }
}