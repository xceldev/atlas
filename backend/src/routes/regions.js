const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
  response.status(200).send({ message: 'GET method for Regions!' })
})

module.exports = router