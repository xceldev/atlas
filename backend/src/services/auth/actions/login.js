const Session = require('../../../models/session')
const User = require('../../../models/user')

const { sign } = require('../../helpers/auth')
const { comparePassword, getUserProperties } = require('../../helpers/user')

module.exports = async (object) => {
  try {
    const { username, password } = getUserProperties(object)

    const user = await User.findOne({
      where: {
        active: true,
        username
      }
    })

    if (!user || !comparePassword(password, user.password)) {
      return { ok: false, error: 'Incorrect user or password!' }
    }

    const newSession = {
      active: true,
      token: sign({ username }),
      refreshToken: sign({ username }, true),
      userId: user.id
    }

    const session = await Session.create(newSession)

    return { ok: true, data: session }
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error!')
  }
}