const regionService = require('../../../services/region')

module.exports = async (request, response) => {
  try {
    const id = request.params.id

    const result = await regionService.findOne(id)

    const { ok } = result

    if (!ok) {
      return response.status(400).json(result)
    }

    response.status(200).json(result)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}