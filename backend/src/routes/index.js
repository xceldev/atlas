const express = require('express')

const router = express.Router()

const citiesRouter = require('./cities')
const countriesRouter = require('./countries')
const regionsRouter = require('./regions')
const usersRouter = require('./users')

router.use('/cities', citiesRouter)
router.use('/countries', countriesRouter)
router.use('/regions', regionsRouter)
router.use('/users', usersRouter)

module.exports = router