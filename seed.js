var Company = require('./models/company.js'),
    User = require('./models/user.js'),
    mongoose = require('mongoose');

//connect to mongo database
mongoose.connect('mongodb://localhost//q_cards_app', function(err){
  if(err){
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});
var ga = new Company({
    name: "General Assembly",
    address: "10 21st Street, NYC"
    email: "hello@generalassemb.ly",
    phone: "+1(917)722-0237",
    website: "https://generalassemb.ly",
    logo: "logo",
    social_media_links: {
      url: "https://www.facebook.com/gnrlassembly/?fref=nf",
    }
});

var arrayOfUsers = new User([{
    username: "kyle",
    password: "potatoes",
    own_card: {
    //here is a link to QRcode api with link to own card
      qr_code: "http://api.qrserver.com/v1/create-qr-code/?data=http://www.qcards.com/user/1/own_card",
      name: {first: "Kyle", last: "Gorjanc"},
      title: "Web developer",
      company: ga,
      email: "kyle@gmail.com",
      phone: "+1(646)500-3425",
      social_media_links: {
        url: "www.kyle.com"
      }
    },
    contacts:[]
},
  {
    username: "cyrus",
    password: "potatoes",
    own_card: {
      name: {first: "Cyrus", last: "Shahrivar"},
      title: "Web developer",
      company: ga,
      email: "cyrus@gmail.com",
      phone: "+1(646)500-6754",
      social_media_links: {
        url: "www.cyrus.com"
      }
    },
    contacts: []
},
  {
    username: "kate",
    password: "potatoes",
    own_card: {
      name: {first: "Kate", last: "Shishkina"},
      title: "Web developer",
      company: ga,
      email: "kate@gmail.com",
      phone: "+1(646)500-1831",
      social_media_links: {
        url: "www.kate.com"
      }
    },
    contacts: []
}
]);
  arrayOfUsers.save(function(err){
    if(err){
      console.log(err);
    } else {
      console.log("saved Kyle, Kate, Cyrus with company GA");
    }
});
