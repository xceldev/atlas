const City = require('../models/city')
const Region = require('../models/region')

module.exports = {
  findAll: async () => {
    try {
      const cities = await City.findAll({
        include: {
          model: Region
        }
      })
      return { ok: true, data: cities }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  findOne: async (id) => {
    try {
      const city = await City.findOne({
        where: { id },
        include: {
          model: Region
        }
      })

      if (!city) {
        return { ok: false, error: 'City not found!' }
      }

      return { ok: true, data: city }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  create: async (object) => {
    try {
      const { regionId } = object

      const region = await Region.findOne({ where: { id: regionId } })

      if (!region) {
        return { ok: false, error: 'Region not found!' }
      }

      const city = await City.create(object)
      return { ok: true, data: city }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  update: async (id, object) => {
    try {
      const { name, code, regionId } = object

      const region = await Region.findOne({ where: { id: regionId }})

      if (!region) {
        return { ok: false, error: 'Region not found!'}
      }

      const city = await City.findOne({ where: { id } })

      if (!city) {
        return { ok: false, error: 'City not found!' }
      }

      city.name = name
      city.code = code
      city.regionId = regionId

      const result = await city.save()
      return { ok: true, data: result }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  delete: async (id) => {
    try {
      const city = await City.destroy({ where: { id } })

      if (!city) {
        return { ok: false, error: 'City not found!' }
      }

      return { ok: true, data: city }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  }
}