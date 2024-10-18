const express = require('express')

const router = require('./routes')

const app = express()

app.use('/app', router)

app.get('/', (request, response) => {
  response.send({ message: 'Hello World!' })
})

app.listen(5000, () => {
  console.log('Atlas App running at http://localhost:5000/')
})