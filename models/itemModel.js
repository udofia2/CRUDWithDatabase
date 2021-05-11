const mongoose = require('mongoose')

const { Schema } = mongoose

const Item = new Schema ({
    name: String,
    description: String
}, {
  timestamps: true
})

module.exports = mongoose.model('products', Product)