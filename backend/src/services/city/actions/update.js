const sequelize = require('sequelize')

const City = require('../../../models/city')
const Region = require('../../../models/region')

const { Op, ValidationError } = sequelize

module.exports = async (id, object) => {
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
}