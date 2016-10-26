var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var bcrypt = require('bcrypt-node')

var userSchema = mongoose.Schema({
  local: {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
})

userSchema.pre('save', function (next) {
  var user = this
  bcrypt.genSalt(5,function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.local.password, salt, null, function (err, hash) {
      if (err) return next(err)

      user.local.password = hash
      next()
    })
  })
})

userSchema.methods.auth = function (givenPassword, callback) {
  console.log('given password is ' + givenPassword)
  console.log('saved password is ' + this.local.password)
  var hashedPassword = this.local.password

  bcrypt.compare(givenPassword, hashedPassword, function (err, isMatch) {
    callback(err, isMatch)
  })
}

var User = mongoose.model('User', userSchema)
module.exports = User
