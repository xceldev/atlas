const countryService = require('../../../services/country')

module.exports = async (request, response) => {
  try {
    const object = request.body

    const result = await countryService.create(object)

    const { ok } = result

    if (!ok) {
      return response.status(400).json(result)
    }

    response.status(201).json(result)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}