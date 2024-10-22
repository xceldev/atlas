const { ValidationError } = require('sequelize')

const Session = require('../../../models/session')

module.exports = async (id, object) => {
  try {
    const { active, token, startedAt, endedAt, userId } = object

    const session = await Session.findOne({ where: { id } })

    if (!session) {
      return { ok: false, error: 'Session not found!' }
    }

    session.active = active
    session.token = token
    session.startedAt = startedAt
    session.endedAt = endedAt
    session.userId = userId

    const result = await session.save()

    return { ok: true, data: result }
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        ok: false,
        error: 'Session could not be updated! Check validation rules!',
        stack: error
      }
    }

    console.error(error)
    throw new Error('Internal server error!')
  }
}