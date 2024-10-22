const authService = require('../../../services/auth')

module.exports = async (request, response) => {
  try {
    const { authorization } = request.headers

    if (!authorization) {
      return response.status(401).json({ error: 'Not authorized!' })
    }

    const [, token] = authorization.split(' ')

    const result = await authService.validateToken({ token })

    const { ok } = result

    if (!ok) {
      return response.status(400).json(result)
    }

    response.status(200).json(result)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}