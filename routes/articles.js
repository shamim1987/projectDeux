var express = require('express')
var router = express.Router()
var Article = require('../models/article')
//ARTICLE MAIN PAGE
router.route('/articles')
 .get(function (req, res) {
    //res.send(req.user._id)
   Article.find({user: req.user.id}, function (err,allArticles) {
     res.render('articles/index', {allArticles: allArticles})
   })
 })
//INDIVIDUAL ARTICLE PAGE
router.route('/articles/:id')
.get(function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    if (err) {
      console.log(err)
      res.redirect('/articles')
    } else {
      res.render('articles/soloart', {article: article})
    }
  })
})
//POST NEW ARTICLE
router.route('/new-article')
  .get(function (req, res) {
    res.render('articles/new', { user: req.user})
  })
  .post(function (req, res) {
    Article.create(req.body.article, function (err) {
    res.redirect('articles')
    })
  })
//EDIT ARTICLE
router.route('/articles/:id/edit')
  .get(function (req, res) {
    //res.render('./articles/edit-article')
    Article.findById(req.params.id, function (err, article) {
      if (err) {
         //res.flash('something wrong happened' + err)
        res.redirect('/articles')
      } else {
        res.render('articles/edit_article', {article: article})
      }
    })
  })
    .post(function (req, res) {
      Article.findByIdAndUpdate (req.params.id, { $set: {title: req.body.article.title, body: req.body.article.body} }, function (err, article) {
        if (err) {
          console.log(err)
          res.redirect('/articles')
        } else {
          res.redirect('/articles/:id')
        }
      })
    })
  //DELETE ARTICLE
router.route('/articles/:id/delete')
    .get(function (req, res) {
      Article.findByIdAndRemove(req.params.id, function (err) {
        if (!err) {
          res.redirect('/articles/:id')
        } else {
          res.send('post not deleted,click back')
        }
      })
    })

module.exports = router
