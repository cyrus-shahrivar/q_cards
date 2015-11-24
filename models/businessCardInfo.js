var mongoose = require('mongoose');

var BusinessCardInfoSchema = new mongoose.Schema({
//displays each users's card public info
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
        //required: true,
        trim: true
      },
      title: String,
  //referencing Company Object
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
      },
      social_media_links: {
        url: String
      }
});

var BusinessCardInfo = mongoose.model('BusinessCardInfo', BusinessCardInfoSchema);

module.exports = BusinessCardInfo;
