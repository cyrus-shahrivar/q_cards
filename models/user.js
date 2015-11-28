var mongoose = require('mongoose'),
    CompanySchema = require('./company.js'),
    BusinessCardInfo = require('./businessCardInfo.js'),
    qr = require('../helpers/qrGenerator.js')
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
  own_card: {
     //qr_url: qrGen(),  //  need to work out how to get qrGen to use the ID
     qr_code: String,
     firstName: {
       type: String,
      //  required: true,
       trim: true
     },
     lastName: {
       type: String,
      //  required: true,
       trim: true
     },
     //we also need to VERIFY the email, to make sure the user is real and contactable, and need to check the validity against a regex.
     email: {
       type: String,
      //  required: true,
       trim: true
     },
     //we also need to take in the phone number in a particular format, process it into a simple string of numbers, then render it back out in our chosen format (ie: countryCode-(areaCode) exchange-lineNumber would spit out 9-(999) 999-9999 or countryCode.areaCode.exchange.lineNumber would perhaps be more internationally friendly, giving us 9.999.999.9999)
     phone: {
       type: String,
       //required: true,
       trim: true
     },
     title: String,
     //referencing Company Object
     company: {
       type: String,
      //  required: true,
       trim: true
     },
     social_media_links: {
       url: String
     }
   }
});

// UserSchema.methods.addBusinessCard = function(req, res) {
//   var user = this;
//   var businesCard = new BusinessCardInfo(req.body);
//   businesCard.save(function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       user.businesCard.push(businesCard._id);
//       user.save(function(err) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(user.username + " saved");
//           res.send(user);
//         }
//       });
//     }
//   });
// }

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

UserSchema.methods.generateQR = qr;


UserSchema.methods.comparePassword = function(userPassword, cb) {
  bcrypt.compare(userPassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  });
};



var User = mongoose.model('User', UserSchema);

module.exports = User;
