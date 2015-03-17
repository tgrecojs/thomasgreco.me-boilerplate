var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var underscore = require('underscore');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tg-doc');



var app = express();

// set our port
var port = process.env.PORT || 3000;

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
  res.json({ message: 'Success' });
});

// -- New Code Below Here -- //

// Create a new route with the prefix /contacts
var contactsRoute = app.route('/api/contact');

// Create endpoint /api/contacts for POSTS
contactsRoute.post(function(req, res) {
  // Create a new instance of the contact model
  var contact = new Contact();

  // Set the contact properties that came from the POST data
  contact.name = req.body.name;
  contact.phone = req.body.phone;
  contact.email = req.body.email;
  contact.location = req.body.location;
  contact.message = req.body.message;

  // Save the contact and check for errors
  contact.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Contact Added', data: contact });
  });
});


// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log(' Welcome to ' + port  + ' Now lets get it baby!');

// expose app           
exports = module.exports = app;