var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var PostSchema = new Schema({  
    name: String,
    date: Date,
    creator: String,
    subject : String,
    content: String
    //ADD DATE
});

module.exports = mongoose.model('Post', PostSchema);  