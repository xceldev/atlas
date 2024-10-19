const countryService = require('../../../services/country')

module.exports = async (request, response) => {
  try {
    const id = request.params.id

    const result = await countryService.findOne(id)

    const { ok } = result

    if (!ok) {
      return response.status(400).json(result)
    }

    response.status(200).json(result)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}