var mongoose = require('mongoose'),
    CompanySchema = require('./company.js');
/*
User object has two components: my_card - public profile to share the QR code with others users, and
all the information of the user for the settings view, so he can update the information, including the password
*/
var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
//own_card is an array of objects that displays a user's own contact information. The basic contact information is required, to prevent users from making cards that aren't useful from a networking perspective.
  own_card: {
    //the qr code will be a url: the location of the qr code image.
    qr_code: String,
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    //we also need to VERIFY the email, to make sure the user is real and contactable, and need to check the validity against a regex.
    email: {
      type: String,
      required: true,
      trim: true},
    //we also need to take in the phone number in a particular format, process it into a simple string of numbers, then render it back out in our chosen format (ie: countryCode-(areaCode) exchange-lineNumber would spit out 9-(999) 999-9999 or countryCode.areaCode.exchange.lineNumber would perhaps be more internationally friendly, giving us 9.999.999.9999)
    phone: {
      type: String,
      required: true,
      trim: true
    },
    title: String,
//referencing Company Object
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },
    links: [
      {linkedin_url: String},
      {personal_url: String}
    ]
  },
//the contacts list is a list of other users whose cards the user has chosen to add to her "virtual rolodex"
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
});

///////////////  HOOK ///////////////////
//this is a 'hook'. It says, 'do this function before you save!'

UserSchema.pre('save', function(next) {
  var user = this;
  //only hash the password if it has been modified.
  if(!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if(err) return next();

    //hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hashedPassword) {
      if(err) return next();

      //override the users password with the hashed one
      user.password = hashedPassword;
      next();
    });
  });
});


UserSchema.methods.comparePassword = function(userPassword, cb) {
  bcrypt.compare(userPassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  });
};



var User = mongoose.model('User', UserSchema);

module.exports = User;
