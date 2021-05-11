const mongoose = require('mongoose')

const {
  Schema
} = mongoose

const Data = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    index: true
  },
  country: {
    type: String,
    require: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('datas', Data)