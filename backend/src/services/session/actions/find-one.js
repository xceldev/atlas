const Session = require('../../../models/session')

module.exports = async (id) => {
  try {
    const session = await Session.findOne({ where: { id } })

    if (!session) {
      return { ok: false, error: 'Session not found!' }
    }

    return { ok: true, data: session }
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}