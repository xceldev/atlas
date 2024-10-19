const sequelize = require('sequelize')

const City = require('../../../models/city')
const Region = require('../../../models/region')

const { ValidationError } = sequelize

module.exports = async (object) => {
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
}