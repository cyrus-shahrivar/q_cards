var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  title: String,
  email: String,
  phone: String,

  // DO WE WANT TO REFENCE COMPANY WITH A MODEL ID - RELATIONAL?
  company: String,
  social_media_links: {
    url: String
  }
});


var User = mongoose.model('User', UserSchema);

module.exports = User;
