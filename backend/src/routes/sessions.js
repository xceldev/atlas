const express = require('express')

const controller = require('../controllers/session')

const middleware = require('../middlewares/auth')

const router = express.Router()

router.route('/')
  .get(middleware, controller.findAll)
  .post(middleware, controller.create)

router.route('/:id')
  .get(middleware, controller.findOne)
  .put(middleware, controller.update)
  .delete(middleware, controller.delete)

module.exports = router