const Country = require('../../../models/country')
const Region = require('../../../models/region')

module.exports = async (id) => {
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
}