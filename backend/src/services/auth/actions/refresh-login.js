const Session = require('../../../models/session')
const User = require('../../../models/user')

const { decode, sign, verify } = require('../../helpers/auth')

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

    const { refreshToken } = session

    const test = verify(refreshToken)

    if (!test) {
      return { ok: false, error: 'Invalid token!' }
    }

    const { sub } = decode(refreshToken)

    const user = await User.findOne({
      where: {
        active: true,
        username: sub
      }
    })

    if (!user) {
      return { ok: false, error: 'Invalid token!' }
    }

    session.token = refreshToken
    session.refreshToken = sign({ username: sub }, true)

    const result = await session.save()

    return { ok: true, data: result }
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}