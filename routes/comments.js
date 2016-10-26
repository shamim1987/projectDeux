var express = require('express')
var router = express.Router()
var comment = require('../models/comment')
    // create a comment

router.get('comment/new', function (req, res) {
  res.render('./views/articles/new.ejs')
})

router.post('/comment', function(req, res) {
  comment.create(req.body.comment,function(err,comment){
  comment.save(function(err) {
     if (!err) {
       console.log('Success!')
         .populate('_article')
       }
  })
})
