const jwt = require('jsonwebtoken')

module.exports = (token) => {
  try {
    return jwt.decode(token)
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}