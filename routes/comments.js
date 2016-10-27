var express = require('express')
var router = express.Router()
var comment = require('../models/comment')
var article = require('../models/article')
//NEW COMMENT
router.route('/:id/new-comment')
      .get(function (req, res) {
        article.findById(req.params.id,function(err,article){
          res.render('comments/new', {article: article})
        })
      })
      .post(function (req, res) {
        article.findByIdAndUpdate(req.params.id,
          {$push: {comment: req.body.comment}},

            function(err, comment) {
              if (err) throw new Error(err)
              // console.log(article)
              res.redirect('/articles')
            }
    )
      })

//REMOVE COMMENT
router.route('')

        // article.findById(req.params.id, function (err, data) {
        //   if (err) {
        //      //res.flash('something wrong happened' + err)
        //     console.log('error')
        //     res.redirect('/articles')
        //   } else {

            // console.log(req.body.comment)
            /*comment.create(req.body.comment, function (err, comm) {
              if (err) {
                console.log('error')
              } else {
                comment.populate('/articles/:id', {comment: comment})
                .exec(function (err, commentAdded) {
                  if (err) {
                   console.log('error')
                  } else {
                    res.redirect('articles/:id', {commentAdded: commentAdded})
                    console.log('post new article')
                  }
                })
              }
            }) */
      //     }
      //   })
      // })
//DELETE COMMENT

module.exports = router
