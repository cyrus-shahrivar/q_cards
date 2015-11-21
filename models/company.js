var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  website: String,
  //social_media_links is an object? 
  social_media_links: {
    url: String
  }
});


var Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
