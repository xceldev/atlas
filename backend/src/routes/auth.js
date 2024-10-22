const express = require('express')

const controller = require('../controllers/auth')

const router = express.Router()

router.route('/login').post(controller.login)
router.route('/logout').put(controller.logout)

module.exports = router