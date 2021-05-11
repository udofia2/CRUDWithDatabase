const mongoose = require('mongoose')

const {
  Schema
} = mongoose

const Item = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    index: true
  },
  description: {
    type: String,
    require: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('items', Item)