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

module.exports = (object) => {
  const { credentials, active } = object

  if (!credentials) {
    return {}
  }

  const username = getUsernameProperty(credentials)
  const password = getPasswordProperty(credentials)

  return { username, password, active }
}