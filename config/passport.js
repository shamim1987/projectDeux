var passport= require('passport')
var LocalStrategy = require('passport-local').Strategy

var User= require('../models/user')
passport.serializeUser(function(user,done){
  done(null,user.id)
})

passport.deserializeUser(function(id,done){
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

passport.use('local-signup', new LocalStrategy ({
  usernameField: 'email',
  passwprdField:'password',
  passReqToCallback :true
}, function(req,email,pw,next) {

  // the auth flow on our local auth routes
}))
