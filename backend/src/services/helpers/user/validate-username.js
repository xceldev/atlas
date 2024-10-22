const { MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH } = require('./constants')

module.exports = (username) => {
  if (!username) {
    return false
  }

  if (username.length < MIN_USERNAME_LENGTH || username.length > MAX_USERNAME_LENGTH) {
    return false
  }

  const regex = /^[a-zA-Z_][a-zA-Z0-9_.]*$/

  return regex.test(username)
}