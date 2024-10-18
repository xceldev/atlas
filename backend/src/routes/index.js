const express = require('express')

const router = express.Router()

const citiesRouter = require('./cities')
const countriesRouter = require('./countries')
const regionsRouter = require('./regions')

router.use('/cities', citiesRouter)
router.use('/countries', countriesRouter)
router.use('/regions', regionsRouter)

module.exports = router