const sequelize = require('sequelize')

const City = require('../models/city')
const Region = require('../models/region')

const { Op, ValidationError } = sequelize

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
      const { code, regionId } = object

      const region = await Region.findOne({ where: { id: regionId ? regionId : 0 } })

      if (!region) {
        return { ok: false, error: 'Region not found!' }
      }

      const cities = await City.count({
        where: {
          code: code ? code : '',
          regionId
        }
      })

      if (cities) {
        return { ok: false, error: `City code must be unique for Region (id: ${ regionId })!` }
      }

      const city = await City.create(object)
      return { ok: true, data: city }
    } catch (error) {
      if (error instanceof ValidationError) {
        return {
          ok: false,
          error: 'City could not be created! Check validation rules!',
          stack: error
        }
      }

      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  update: async (id, object) => {
    try {
      const { name, code, regionId } = object

      const city = await City.findOne({ where: { id } })

      if (!city) {
        return { ok: false, error: 'City not found!' }
      }

      const region = await Region.findOne({ where: { id: regionId ? regionId : 0 } })

      if (!region) {
        return { ok: false, error: 'Region not found!'}
      }
      
      const cities = await City.count({
        where: {
          id: {
            [Op.not]: id
          },
          code: code ? code : '',
          regionId
        }
      })

      if (cities) {
        return { ok: false, error: `City code must be unique for Region (id: ${ regionId })!` }
      }

      city.name = name
      city.code = code
      city.regionId = regionId

      const result = await city.save()
      return { ok: true, data: result }
    } catch (error) {
      if (error instanceof ValidationError) {
        return {
          ok: false,
          error: 'City could not be updated! Check validation rules!',
          stack: error
        }
      }

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