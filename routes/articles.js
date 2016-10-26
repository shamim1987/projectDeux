var express = require('express')
var router = express.Router()
var article = require('../models/article')

router.route('/articles')
 .get(function (req, res) {
   article.find({},
     function(err, allArticles) {
       res.render('articles/index', {allArticles: allArticles})
     })
 })

router.route('/articles/:id')
.get(function (req, res) {
  article.findById(req.params.id, function (err, data) {
    if (err) {
       //res.flash('something wrong happened' + err)
      res.redirect('/articles')
    } else {
      console.log('post new article')
      res.send(data)
    }
  })
})

router.route('/new-article')
  .get(function (req, res) {
    res.render('./articles/new')
  })
  .post(function (req, res) {
    article.create(req.body.article, function(err, allArticles) {
    res.redirect('articles'),{allArticles: allArticles}
    })
  })

module.exports = router
