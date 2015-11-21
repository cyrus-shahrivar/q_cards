var mongoose = require('mongoose'),
    CompanySchema = require('./company.js');
/*
User object has two components: my_card - public profile to share the QR code with others users, and
all the information of the user for the settings view, so he can update the information, including the password
*/
var UserSchema = new mongoose.Schema({
  username: String,
//my_card displays a public profile with contact information
  my_card: [{
    qr_code: String,
    name: {first: String, last: String},
    email: String,
    phone: String,
    title: String,
//referencing Company Object
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },
    social_media_links: {
      url: String
    },
  }],
  password: String,
//referncing other User
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
