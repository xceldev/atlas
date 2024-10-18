const express = require('express')
const app = express()

app.get('/', (request, response) => {
  response.send({ message: 'Hello World!' })
})

app.listen(5000, () => {
  console.log('Atlas App running at http://localhost:5000/')
})