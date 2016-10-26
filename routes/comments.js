var express = require('express')
var router = express.Router()
var comment = require('../models/comment')
var article = require('../models/article')

router.route('/new-comment')
      .get(function (req, res) {
        res.render('./comments/new')
      })
      .post(function (req, res) {
        article.findById({}, function (err, comment) {
          comment.create(req.body.comment, function () {
            comment.populate('comment')
            .exec(function (err, allComments) {
              res.redirect('comments', {allComments: allComments})
            })
          })
        })
      })

module.exports = router
