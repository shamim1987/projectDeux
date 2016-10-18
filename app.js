var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/donut-shop')

app.set('view engine', 'ejs')
app.use(layout)

// serve static files
app.use(express.static(__dirname + '/public'))

var frontendRoutes = require('./routes/donuts')
var ajaxRoutes = require('./routes/donuts_api')

var usersRoutes = require('./routes/users')
var usersAPIRoutes = require('./routes/users_api')

app.use(bodyParser.json()) // to parse ajax json req
app.use(bodyParser.urlencoded({
