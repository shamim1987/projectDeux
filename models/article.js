var mongoose = require('mongoose')

var articleSchema = new mongoose.Schema({
  title: String,
  post:String,
})

var article = mongoose.model('article', articleSchema)

module.exports = Song
