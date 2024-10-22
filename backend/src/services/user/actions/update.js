const sequelize = require('sequelize')

const User = require('../../../models/user')

const {
  getUserProperties,
  hashPassword,
  validatePassword,
  validateUsername
} = require('../../helpers/user')

const { Op, ValidationError } = sequelize

module.exports = async (id, object) => {
  try {
    const user = await User.findOne({ where: { id } })

    if (!user) {
      return { ok: false, error: 'User not found!' }
    }

    let newUser = getUserProperties(object)

    const { username, password } = newUser

    const test = await User.count({
      where: {
        id: {
          [Op.not]: id
        },
        username
      }
    })

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

    user.username = newUser.username
    user.password = newUser.password
    user.active = newUser.active

    const result = await user.save()

    return { ok: true, data: result }
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        ok: false,
        error: 'User could not be updated! Check validation rules!',
        stack: error
      }
    }

    console.error(error)
    throw new Error('Internal server error!')
  }
}