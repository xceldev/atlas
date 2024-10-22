const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const { TokenExpiredError } = jwt

dotenv.config()

module.exports = (token) => {
  try {
    const secretKey = process.env.JWT_SECRET
    return jwt.verify(token, secretKey)
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return null
    }
    console.error(error)
    throw new Error('Internal server error!')
  }
}