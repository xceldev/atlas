const User = require('../../../models/user')

module.exports = async () => {
  try {
    const users = await User.scope('withoutPassword').findAll()
    return { ok: true, data: users }
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}