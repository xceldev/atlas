const Country = require('../../../models/country')
const Region = require('../../../models/region')

module.exports = async () => {
  try {
    const regions = await Region.findAll({
      include: {
        model: Country
      }
    })

    return { ok: true, data: regions }
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}