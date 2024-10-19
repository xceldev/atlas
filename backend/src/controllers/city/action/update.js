const cityService = require('../../../services/city')

module.exports = async (request, response) => {
  try {
    const id = request.params.id
    const object = request.body

    const result = await cityService.update(id, object)

    const { ok } = result

    if (!ok) {
      return response.status(400).json(result)
    }

    response.status(200).json(result)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: error.message })
  }
}