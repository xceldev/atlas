const regionService = require('../services/region')

module.exports = {
  findAll: async (request, response) => {
    try {
      const result = await regionService.findAll()
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
      const result = await regionService.findOne(id)
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
      const result = await regionService.create(object)
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
      const result = await regionService.update(id, object)
      const { ok } = result

      if (!ok) {
        return response.status(400).json(result)
      }

      response.status(200).json(result)
    } catch (error) {
      console.error(error)
      response.status(400).json({ error: error.message })
    }
  },
  delete: async (request, response) => {
    try {
      const id = request.params.id
      const result = await regionService.delete(id)
      const { ok } = result

      if (!ok) {
        return response.status(400).json(result)
      }

      response.status(200).json(result)
    } catch (error) {
      console.error(error)
      response.status(400).json({ error: error.message })
    }
  }
}