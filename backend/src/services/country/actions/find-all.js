const Country = require('../../../models/country')

module.exports = async () => {
  try {
    const countries = await Country.findAll()
    return { ok: true, data: countries }
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}