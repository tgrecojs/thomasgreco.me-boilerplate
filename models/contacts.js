var mongoose = require('mongoose');
var ContactSchema = new mongoose.Schema({
  name: String,
  link: String,
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('Contact', ContactSchema);