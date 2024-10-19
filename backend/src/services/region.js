const sequelize = require('sequelize')

const Country = require('../models/country')
const Region = require('../models/region')

const { Op, ValidationError } = sequelize

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
        return { ok: false, error: 'Region not found!' }
      }

      return { ok: true, data: region }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  create: async (object) => {
    try {
      const { code, countryId } = object

      const country = await Country.findOne({ where: { id: countryId ? countryId : 0 } })

      if (!country) {
        return { ok: false, error: 'Country not found!' }
      }

      const regions = await Region.count({
        where: {
          code: code ? code : '',
          countryId
        }
      })

      if (regions) {
        return { ok: false, error: `Region code must be unique for Country (id: ${ countryId })!` }
      }

      const region = await Region.create(object)
      return { ok: true, data: region }
    } catch (error) {
      if (error instanceof ValidationError) {
        return {
          ok: false,
          error: 'Region could not be created! Check validation rules!',
          stack: error
        }
      }

      console.error(error)
      throw new Error('Internal server error!')
    }
  },
  update: async (id, object) => {
    try {
      const { name, code, countryId } = object

      const region = await Region.findOne({ where: { id } })

      if (!region) {
        return { ok: false, error: 'Region not found!' }
      }

      const country = await Country.findOne({ where: { id: countryId ? countryId : 0 } })

      if (!country) {
        return { ok: false, error: 'Country not found!'}
      }

      const regions = await Region.count({
        where: {
          id: {
            [Op.not]: id
          },
          code: code ? code : '',
          countryId
        }
      })

      if (regions) {
        return { ok: false, error: `Region code must be unique for Country (id: ${ countryId })!` }
      }

      region.name = name
      region.code = code
      region.countryId = countryId

      const result = await region.save()
      return { ok: true, data: result }
    } catch (error) {
      if (error instanceof ValidationError) {
        return {
          ok: false,
          error: 'Region could not be updated! Check validation rules!',
          stack: error
        }
      }

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