const City = require('../../../models/city')

module.exports = async (id) => {
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