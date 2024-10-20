const bcrypt = require('bcrypt')
const { ValidationError, ValidationErrorItem } = require('sequelize')

const MIN_USERNAME_LENGTH = 8
const MAX_USERNAME_LENGTH = 16
const MIN_PASSWORD_LENGTH = 8
const MAX_PASSWORD_LENGTH = 64

const getUsernameProperty = (data) => {
  const credentials = JSON.parse(atob(data))
  const { username } = credentials
  return username ? username : ''
}

const getPasswordProperty = (data) => {
  const credentials = JSON.parse(atob(data))
  const { password } = credentials
  return password ? password : ''
}

module.exports = {
  getUserProperties: (object) => {
    const { credentials, active } = object

    if (!credentials) {
      return {}
    }

    const username = getUsernameProperty(credentials)
    const password = getPasswordProperty(credentials)

    return { username, password, active }
  },
  hashPassword: (password) => {
    try {
      const saltRounds = 16
      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = bcrypt.hashSync(password, salt)
      return hashedPassword
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error!')
    }
  },
  validatePassword: (password) => {
    if (!password) {
      return false
    }

    if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
      return false
    }

    const regexes = [
      /.*[a-z].*/,
      /.*[A-Z].*/,
      /.*[0-9].*/,
      /.*[!@#$%&*?].*/
    ]

    return !regexes.some((item) => !item.test(password))
  },
  validateUsername: (username) => {
    if (!username) {
      return false
    }

    if (username.length < MIN_USERNAME_LENGTH || username.length > MAX_USERNAME_LENGTH) {
      return false
    }

    const regex = /^[a-zA-Z_][a-zA-Z0-9_.]*$/

    return regex.test(username)
  }
}