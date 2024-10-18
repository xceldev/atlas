const Country = require('../models/country')

module.exports = {
  findAll: async () => {
    try {
      const countries = await Country.findAll()
      return { ok: true, data: countries }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  findOne: async (id) => {
    try {
      const country = await Country.findOne({ where: { id } })

      if (!country) {
        return { ok: false, error: 'Country not found!' }
      }

      return { ok: true, data: country }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  create: async (object) => {
    try {
      const country = await Country.create(object)
      return { ok: true, data: country}
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  update: async (id, object) => {
    try {
      const { name, code } = object
      const country = await Country.findOne({ where: { id } })

      if (!country) {
        return { ok: false, error: 'Country not found!' }
      }

      country.name = name
      country.code = code

      const result = await country.save()
      return { ok: true, data: result }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  delete: async (id) => {
    try {
      const country = await Country.destroy({ where: { id } })

      if (!country) {
        return { ok: false, error: 'Country not found!' }
      }

      return { ok: true, data: country }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  }
}