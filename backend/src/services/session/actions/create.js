const { ValidationError } = require('sequelize')

const Session = require('../../../models/session')

module.exports = async (object) => {
  try {
    const session = await Session.create(object)
    return { ok: true, data: session }
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        ok: false,
        error: 'Session could not be created! Check validation rules!',
        stack: error
      }
    }

    console.error(error)
    throw new Error('Internal server error!')
  }
}