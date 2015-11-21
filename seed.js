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
    email: "hello@generalassemb.ly",
    phone: "+1(917)722-0237",
    wbsite: "https://generalassemb.ly",
    social_media_links: {
      url: "https://www.facebook.com/gnrlassembly/?fref=nf",
    }
});
var kyle = new User({
    name: {first: "Kyle", last: "Gorjanc"},
    password: "potatoes",
    title: "Web developer",
    email: "kyle@gmail.com",
    phone: "+1(646)500-3425",
    social_media_links: {
      url: "www.kyle.com"
    },
    company: ga
});
  kyle.save(function(err){
    if(err){
      console.log(err);
    } else {
      console.log("seved kyle with company GA");
    }
  });

  var cyrus = new User({
    name: {first: "Cyrus", last: "Shahrivar"},
    password: "potatoes",
    title: "Web developer",
    email: "cyrus@gmail.com",
    phone: "+1(646)500-6754",
    social_media_links: {
      url: "www.cyrus.com"
    },
    company: ga
});
  cyrus.save(function(err){
    if(err){
      console.log(err);
    } else {
      console.log("seved Cyrus with company GA");
    }
});

  var kate = new User({
    name: {first: "Kate", last: "Shishkina"},
    password: "potatoes",
    title: "Web developer",
    email: "kate@gmail.com",
    phone: "+1(646)500-1831",
    social_media_links: {
      url: "www.kate.com"
    },
    company: ga
});
  kate.save(function(err){
    if(err){
      console.log(err);
    } else {
      console.log("seved Kate with company GA");
    }
});
