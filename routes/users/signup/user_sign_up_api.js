var express=require('express');
var router= express.router();

var Song= require('./models/song')

module.exports = router
router.get('/', function (req, res) {
  Song.find({}, function (err, allSongs) {
    res.json(allSongs)
  })
})
