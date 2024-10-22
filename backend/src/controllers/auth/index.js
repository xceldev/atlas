const loginAction = require('./actions/login')
const logoutAction = require('./actions/logout')
const refreshLoginAction = require('./actions/refresh-login')
const validateTokenAction = require('./actions/validate-token')

module.exports = {
  login: loginAction,
  logout: logoutAction,
  refreshLogin: refreshLoginAction,
  validateToken: validateTokenAction
}