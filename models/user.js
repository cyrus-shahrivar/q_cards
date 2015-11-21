var mongoose = require('mongoose'),
    CompanySchema = require('./company.js');

var UserSchema = new mongoose.Schema({
  //if we want to be able to search by first/last name
  name: {first: String, last: String},
  password: String,
  title: String,
  email: String,
  phone: String,
  // DO WE WANT TO REFENCE COMPANY WITH A MODEL ID - RELATIONAL?
  //I nthink so, don't we want to be able to list people from a chosen companY?
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  social_media_links: {
    url: String
  }
});


var User = mongoose.model('User', UserSchema);

module.exports = User;
