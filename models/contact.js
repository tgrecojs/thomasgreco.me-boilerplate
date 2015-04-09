var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var ContactSchema = new Schema({  
    contactName: String,
    contactEmail: String,
    contactLocation: String,
    contactReason : String,
    contactMessage: String
    //ADD DATE
});

module.exports = mongoose.model('Contact', ContactSchema);  