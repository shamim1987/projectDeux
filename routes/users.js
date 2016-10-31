var express = require('express')
var router = express.Router()
var passport = require('passport')
var flash = require('connect-flash')

function authCheck (req, res, next) {
  // if req.isAuthenticated is false, then let it be

  // if it's true, redirect back to profile

  if (req.isAuthenticated()) {
    req.flash('signupMessage', 'You have logged in, welcome?')
    return res.redirect('/articles')
  } else {
    return next()
  }
}

//SIGNUP ROUTE
router.route('/signup')
  .get(authCheck, function (req, res) {
    res.render('users/signup')
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/articles',
    failureRedirect: '/test',
    failureFlash: true
  }))
//LOGIN ROUTE
router.route('/login')
  .get(authCheck, function (req, res) {
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

//LOGOUT ROUTE
router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})

module.exports = router
