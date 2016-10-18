var express=require('express');
var router= express.router();

var Song= require('./models/song')
router.get('/', function (req, res) {
  Donut.find({}, function (err, allSongs) {
    console.log(allSongs)
    res.render('songs/index', {
      allSongs: allSongs
    })
  })
})
