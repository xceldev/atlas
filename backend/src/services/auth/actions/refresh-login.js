const Session = require('../../../models/session')

const { decode, sign, verify } = require('../../helpers/auth')

module.exports = async (object) => {
  try {
    const { token } = object

    const session = await Session.findOne({ where: { token } })

    if (!session) {
      return { ok: false, error: 'Session not found!' }
    }

    if (!session.active) {
      return { ok: false, error: 'User already logged out!' }
    }

    const { refreshToken } = session

    const test = verify(refreshToken)

    if (!test) {
      return { ok: false, error: 'Invalid token!' }
    }

    const { sub } = decode(refreshToken)

    session.token = refreshToken
    session.refreshToken = sign({ username: sub }, true)

    const result = await session.save()

    return { ok: true, data: result }
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}