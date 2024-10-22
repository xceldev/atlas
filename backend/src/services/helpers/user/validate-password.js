const { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } = require('./constants')

module.exports = (password) => {
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
}