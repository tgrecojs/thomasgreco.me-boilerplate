var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
require('./models/comments');
require('./models/contacts');

mongoose.connect('mongodb://localhost:27017/doc-tg');

//var Contact = require('./models/schema');

// Connect to MongoDB...
//mongoose.connect('mongodb://tom:beerdoc@ds041671.mongolab.com:41671/heroku_app33526064');


var app = express();

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url); 

//logger = morgan - logs errors to console
app.use(logger('dev'));


// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================


app.get('/', function(req, res) {
    res.json({
        message: 'You are running dangerously low on contact!'
    });
});


// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;