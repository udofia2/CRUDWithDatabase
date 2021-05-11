require('dotenv').config()
const express = require('express')

const app = express()

require('./utils/database')()

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use('/', require('./routes/dataRouter'))


app.use((req, res, next) => {
  res.status(404).json({
    message: 'fail',
    data: `Sorry, can't find ${req.url}`
  })
  next()
  // console.log(req)
})

app.listen(parseInt(process.env.PORT), () => console.log(`Server is connected on ${parseInt(process.env.PORT)}`))

module.exports = app