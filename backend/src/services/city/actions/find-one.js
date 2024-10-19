const City = require('../../../models/city')
const Region = require('../../../models/region')

module.exports = async (id) => {
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
}