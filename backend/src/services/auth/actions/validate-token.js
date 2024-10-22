const Session = require('../../../models/session')
const User = require('../../../models/user')

const { decode, verify } = require('../../helpers/auth')

module.exports = async (object) => {
  try {
    const { token } = object

    const session = await Session.findOne({
      where: {
        active: true,
        token
      }
    })

    if (!session) {
      return { ok: false, error: 'Session not found!' }
    }

    const test = verify(token)

    if (!test) {
      return { ok: false, error: 'Invalid token!' }
    }

    const { sub } = decode(token)

    const user = await User.findOne({
      where: {
        active: true,
        username: sub
      }
    })

    if (!user) {
      return { ok: false, error: 'Invalid token!' }
    }

    return { ok: true }
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}