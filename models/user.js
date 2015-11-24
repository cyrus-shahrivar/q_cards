var mongoose = require('mongoose'),
    CompanySchema = require('./company.js'),
    bcrypt = require('bcrypt');
/*
User object has two components: my_card - public profile to share the QR code with others users, and
all the information of the user for the settings view, so he can update the information, including the password
*/
var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
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
