var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title: String,
  content: String,
  author: String,
});

module.exports = mongoose.model('Blog', BlogSchema);