var mongoose = require('mongoose')
var Schema = mongoose.Schema

var commentSchema = new Schema({
  title: String,
  author: String,
  body: String
})

//var Comment = mongoose.model('Comment', commentSchema)

module.exports = commentSchema
