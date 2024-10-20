const User = require('../../../models/user')

module.exports = async (id) => {
  try {
    const user = await User.findOne({
      where: { id }
    })

    if (!user) {
      return { ok: false, error: 'User not found!' }
    }

    return { ok: true, data: user }
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}