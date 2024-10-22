const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()

module.exports = (user, isRefreshToken) => {
  try {
    const { username } = user

    const payload = {
      iss: process.env.JWT_ISSUER,
      sub: username,
    }

    const expiration = Number(process.env.JWT_EXPIRATION) || 0
    const secretKey = process.env.JWT_SECRET

    const options = {
      expiresIn: isRefreshToken ? (expiration * 2) : expiration
    }

    return jwt.sign(payload, secretKey, options)
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}