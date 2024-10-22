const express = require('express')

const router = express.Router()

const authRouter = require('./auth')
const citiesRouter = require('./cities')
const countriesRouter = require('./countries')
const regionsRouter = require('./regions')
const sessionsRouter = require('./sessions')
const usersRouter = require('./users')

router.use('/auth', authRouter)
router.use('/cities', citiesRouter)
router.use('/countries', countriesRouter)
router.use('/regions', regionsRouter)
router.use('/sessions', sessionsRouter)
router.use('/users', usersRouter)

module.exports = router