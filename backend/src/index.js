const express = require('express')

const sequelize = require('./config/database')
const router = require('./routes')

sequelize.authenticate()
  .then(() => {
    console.log('Database connected!')
  })
  .catch((error) => {
    console.error('Unable to connect to database:', error)
  })

const app = express()

app.use(express.json())
app.use('/app', router)

app.listen(5000, () => {
  console.log('Atlas App running at http://localhost:5000/')
})