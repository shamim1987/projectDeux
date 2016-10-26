var express = require('express')
var router = express.Router()
var passport = require('passport')

router.route('/signup')
  .get(function (req, res) {
    res.render('users/signup')
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/articles',
    failureRedirect: '/test',
    failureFlash: true
  }))

router.route('/login')
  .get(function (req, res) {
    res.render('users/signin', {
      message: req.flash('loginMessage')
    })
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/articles',
    failureRedirect: '/login',
    failureFlash: true
  }))
/*
router.get('/profile', function (req, res) {
  res.send(req.user)
    res.render('users/profile', { message: req.flash('loginMessage') })
})
*/
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})

module.exports = router
