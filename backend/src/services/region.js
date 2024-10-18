const Country = require('../models/country')
const Region = require('../models/region')

module.exports = {
  findAll: async () => {
    try {
      const regions = await Region.findAll({
        include: {
          model: Country
        }
      })
      return { ok: true, data: regions }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  findOne: async (id) => {
    try {
      const region = await Region.findOne({
        where: { id },
        include: {
          model: Country
        }
      })

      if (!region) {
        return { ok: false, error: 'Country not found!' }
      }

      return { ok: true, data: region }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  create: async (object) => {
    try {
      const { countryId } = object

      const country = await Country.findOne({ where: { id: countryId } })

      if (!country) {
        return { ok: false, error: 'Country not found!' }
      }

      const region = await Region.create(object)
      return { ok: true, data: region }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  update: async (id, object) => {
    try {
      const { name, code, countryId } = object

      const country = await Country.findOne({ where: { id: countryId }})

      if (!country) {
        return { ok: false, error: 'Country not found!'}
      }

      const region = await Region.findOne({ where: { id } })

      if (!region) {
        return { ok: false, error: 'Region not found!' }
      }

      region.name = name
      region.code = code
      region.countryId = countryId

      const result = await region.save()
      return { ok: true, data: result }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  delete: async (id) => {
    try {
      const region = await Region.destroy({ where: { id } })

      if (!region) {
        return { ok: false, error: 'Region not found!' }
      }

      return { ok: true, data: region }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  }
}