const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: String,
  number: Number
})
const Category = mongoose.model('Category', categorySchema)

module.exports = Category
