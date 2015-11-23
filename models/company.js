var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    // set: toLower
  },
  phone: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    required: true,
    trim: true
  },
  logo: String,
  social_media_links: Array
});

var Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
