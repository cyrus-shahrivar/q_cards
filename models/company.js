var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  phone: String,
  website: String,
  logo: String,
  social_media_links: Array
});

var Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
