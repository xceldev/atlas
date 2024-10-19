const City = require('../../../models/city')
const Region = require('../../../models/region')

module.exports = async () => {
  try {
    const cities = await City.findAll({
      include: {
        model: Region
      }
    })

    return { ok: true, data: cities }
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}