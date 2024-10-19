const { ValidationError } = require('sequelize')

const Country = require('../../../models/country')

module.exports = async (id, object) => {
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
    if (error instanceof ValidationError) {
      return {
        ok: false,
        error: 'Country could not be updated! Check validation rules!',
        stack: error
      }
    }

    console.error(error)
    throw new Error('Internal server error!')
  }
}