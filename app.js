require('dotenv').config()
const express = require('express')

const app = express()

app.use((req, res, next) => {
  res.status(404).send(`Sorry, can't find ${req.url}`)
  next()
})

app.listen(parseInt(process.env.PORT), () => console.log(`Server is connected on ${parseInt(process.env.PORT)}`))

module.exports = app