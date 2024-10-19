const { ValidationError } = require('sequelize')

const Country = require('../../../models/country')

module.exports = async (object) => {
  try {
    const country = await Country.create(object)
    return { ok: true, data: country}
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        ok: false,
        error: 'Country could not be created! Check validation rules!',
        stack: error
      }
    }

    console.error(error)
    throw new Error('Internal server error!')
  }
}