const Session = require('../../../models/session')

const { compareTimestamps, decode } = require('../../helpers/auth')

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

    const decoded = decode(token)

    const jwtTimestamp = decoded.exp * 1000
    const dateTimestamp = Date.now()

    let endedAt = null

    if (compareTimestamps(dateTimestamp, jwtTimestamp) === 1) {
      endedAt = new Date(jwtTimestamp)
    } else {
      endedAt = new Date(dateTimestamp)
    }

    session.active = false
    session.endedAt = endedAt

    const result = await session.save()

    return { ok: true, data: result }
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}