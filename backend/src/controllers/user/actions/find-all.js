const userService = require('../../../services/user')

module.exports = async (request, response) => {
  try {
    const result = await userService.findAll()

    const { ok } = result

    if (!ok) {
      return response.status(400).json(result)
    }

    response.status(200).json(result)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}