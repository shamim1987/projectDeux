var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var flash = require('connect-flash')
var session = require('express-session')
var passport = require('passport')
var MongoStore = require('connect-mongo')(session)
//var methodOverride = require('method-override')
var dotenv = require('dotenv')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise

/*
 Load environment variables from .env file, where API keys and passwords are configured.
 */

dotenv.load({ path: '.env.' + process.env.NODE_ENV })
mongoose.connect(process.env.MONGO_URI)
//app.use(methodOverride)
app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(layout)
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
// serve static files
app.use(express.static(__dirname + '/public'))

var articlefrontendRoutes = require('./routes/articles')
//var articleAjaxRoutes = require('./routes/articles_api')
var usersRoutes = require('./routes/users')
var commentfrontendRoutes = require('./routes/comments')
// var commentajaxRoutes = require('./routes/comments_api')

app.use(bodyParser.urlencoded({
  extended: true
})) // to parse form submitted data

//app.use('/api/article', articleAjaxRoutes) // only handle ajax request
require('./config/passport')(passport)
app.use('/', articlefrontendRoutes) // only render ejs files
app.use('/', usersRoutes)
// app.use('/api/users', usersAPIRoutes)
app.use('/', commentfrontendRoutes)

app.listen(process.env.PORT || 4000)
console.log('Server started')
