const { ValidationError } = require('sequelize')

const Country = require('../../../models/country')
const Region = require('../../../models/region')

module.exports = async (object) => {
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
}