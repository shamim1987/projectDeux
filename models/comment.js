var mongoose = require('mongoose')
var Schema = mongoose.Schema

var commentSchema = new Schema({
  title: String,
  author: String,
  body: String,
  article : {
    type:Schema.Types.ObjectId,
    ref : 'article'
  }
})

var Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
