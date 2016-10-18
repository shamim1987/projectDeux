var mongoose = require('mongoose')

var songSchema = new mongoose.Schema({
  title: String,
  year: Number,
  genre:String,
})

var Song = mongoose.model('Song', songSchema)

module.exports = Song
