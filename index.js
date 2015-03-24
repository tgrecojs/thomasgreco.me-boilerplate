var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var http = require('http');
var fs = require('fs-extra');

//var routes = require('./routes/index');

// Mongoose ODM...
var mongoose = require('mongoose');
//var Contact = require('./models/schema');

// Connect to MongoDB...
mongoose.connect('mongodb://tom:database@ds039020.mongolab.com:39020/thomasgreco');
var api = require('./api/routes');


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
 //Add this line  
app.set('views', path.join(__dirname, 'views'));  
app.use(express.static(path.join(__dirname, 'public')));  

app.use('/api', api); // Add this line  

//  Where routes would be placed or called 


// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;