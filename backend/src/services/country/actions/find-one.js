const Country = require('../../../models/country')

module.exports = async (id) => {
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
}