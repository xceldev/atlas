const Session = require('../../../models/session')

module.exports = async () => {
  try {
    const sessions = await Session.findAll()
    return { ok: true, data: sessions }
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}