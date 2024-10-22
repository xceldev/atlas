const bcrypt = require('bcrypt')

const { SALT_ROUNDS } = require('./constants')

module.exports = (test, password) => {
  try {
    bcrypt.genSaltSync(SALT_ROUNDS)
    return bcrypt.compareSync(test, password)
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}