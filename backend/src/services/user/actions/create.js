const { ValidationError } = require('sequelize')

const User = require('../../../models/user')

const {
  getUserProperties,
  hashPassword,
  validatePassword,
  validateUsername
} = require('../../helpers/user')

module.exports = async (object) => {
  try {
    const newUser = getUserProperties(object)

    const { username, password } = newUser

    const test = await User.count({ where: { username } })

    if (test) {
      return { ok: false, error: 'Username already exists!' }
    }

    if (!validateUsername(username)) {
      return { ok: false, error: 'Invalid username!' }
    }

    if (!validatePassword(password)) {
      return { ok: false, error: 'Invalid password!' }
    }

    newUser.password = hashPassword(password)

    const user = await User.create(newUser)

    return { ok: true, data: user }
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        ok: false,
        error: 'User could not be created! Check validation rules!',
        stack: error
      }
    }

    console.error(error)
    throw new Error('Internal server error!')
  }
}