const Region = require('../../../models/region')

module.exports = async (id) => {
  try {
    const region = await Region.destroy({ where: { id } })

    if (!region) {
      return { ok: false, error: 'Region not found!' }
    }

    return { ok: true, data: region }
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}