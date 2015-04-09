var mongoose = require('mongoose');
var Contact = require('../../models/contact');


module.exports.addContact = function(req, res) {
    var contact = new Contact(req.body.contact);
    contact.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({
            contact: contact
        });
    });
};




