const authService = require('../services/auth')

module.exports = async (request, response, next) => {
  try {
    const { authorization } = request.headers

    if (!authorization) {
      return response.status(401).json({ ok: false, error: 'Not authorized!' })
    }

    const [, token] = authorization.split(' ')

    const validationResult = await authService.validateToken({ token })

    const isValid = validationResult?.ok

    if (isValid) {
      return next()
    }

    const refreshResult = await authService.refreshLogin({ token })

    const isRefreshed = refreshResult?.ok

    if (isRefreshed) {
      return next()
    }

    return response.status(401).json(refreshResult)
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}