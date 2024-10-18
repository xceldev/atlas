const countryService = require('../services/country')

module.exports = {
  findAll: async (request, response) => {
    try {
      const result = await countryService.findAll()
      const { ok } = result

      if (!ok) {
        return response.status(400).json(result)
      }

      response.status(200).json(result)
    } catch (error) {
      response.status(500).json({ error: error.message })
    }
  },
  findOne: async (request, response) => {
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
  },
  create: async (request, response) => {
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
  },
  update: async (request, response) => {
    try {
      const id = request.params.id
      const object = request.body
      const result = await countryService.update(id, object)
      const { ok } = result

      if (!ok) {
        return response.status(400).json(result)
      }

      response.status(200).json(result)
    } catch (error) {
      response.status(500).json({ error: error.message })
    }
  },
  delete: async (request, response) => {
    try {
      const id = request.params.id
      const result = await countryService.delete(id)
      const { ok } = result

      if (!ok) {
        return response.status(400).json(result)
      }

      response.status(200).json(result)
    } catch (error) {
      response.status(500).json({ error: error.message })
    }
  }
}