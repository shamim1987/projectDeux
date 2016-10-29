var express = require('express')
var router = express.Router()
var comment = require('../models/comment')
var Article = require('../models/article')
//NEW COMMENT
router.route('/:id/new-comment')
      .get(function (req, res) {
        Article.findById(req.params.id,function(err,article){
          res.render('comments/new', {article: article})
        })
      })
      .post(function (req, res) {
        Article.findByIdAndUpdate(req.params.id,
          {$push: {comment: req.body.comment}},

            function (err, comment) {
              if (err) throw new Error(err)
              // console.log(article)
              res.redirect('/articles')
            }
    )
      })

//REMOVE COMMENT

module.exports = router
