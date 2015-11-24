var Company = require('./models/company.js'),
    User = require('./models/user.js'),
    BusinessCardInfo = require('./models/businessCardInfo.js'),
    mongoose = require('mongoose');

//connect to mongo database
mongoose.connect('mongodb://localhost/q_cards_app', function (err) {
  if(err){
    console.log(err);
  } else {
    console.log('connection successful2');
  }
});

var arrayOfCompanies = [{
    name: "General Assembly",
    address: "10 21st Street, NYC",
    email: "hello@generalassemb.ly",
    phone: "+1(917)722-0237",
    website: "https://generalassemb.ly",
    logo: "logo",
    social_media_links: {
      url: "https://www.facebook.com/gnrlassembly/?fref=nf",
    }
  },
  {
    //slightly difference (see address)
    name: "General Assembly2",
    address: "920 E Broadway, NYC",
    email: "hello@generalassemb.ly",
    phone: "+1(917)722-0237",
    website: "https://generalassemb.ly",
    logo: "logo",
    social_media_links: {
      url: "https://www.facebook.com/gnrlassembly/?fref=nf",
    }
  }
];

var arrayOfUsers = [{
    username: "kyle",
    password: "potatoes",
    //i want to add business card which matches this user, but how?
    //to do this, you would either have to do callback hell or a recursive function
    //or take a portion of the form from html and put it in user, and take a bit and put in business card info
    //and then you would have to have them reference each other somehow
    //i actually think the way we did it before is better because it is in keeping with
    //mongo structure (i.e. non-relational)
    //so if you want a subset of info, you just call that form the JSON object
    //there isn't a complex web of relationships unless necessary
    //even company doesn't necessarily have to be a model as you can iterate over
    //all users and determine which companies they work for
    //it is up to each user to make sure their data is consistent
    //facebook and others make recommendations as to what to fill out in your fields probably to create consistency across users
    //without using relational databases
    //relationships at time of creation are not natural for mongo
    businesCard:['3455346465375467546754674567'],
    contacts:[]
},
  {
    username: "cyrus",
    password: "potatoes",
    businesCard:['3455346465375467546754674567'],
    contacts: []
},
  {
    username: "kate",
    password: "potatoes",
    businesCard:['3455346465375467546754674567'],
    contacts: []
  }
];

var arrayOfCardInfo = [{
    qr_code: "http://api.qrserver.com/v1/create-qr-code/?data=http://www.qcards.com/user/1/own_card",
    firstName:"Kyle",
    lastName: "Gorjanc",
    title: "Web developer",
    company: "565370fb61e13a0705ff6946",
    email: "kyle@gmail.com",
    phone: "+1(646)500-3425",
    social_media_links: {
      url: "www.kyle.com"
    }
  },
  {
    qr_code: "http://api.qrserver.com/v1/create-qr-code/?data=http://www.qcards.com/user/1/own_card",
    firstName:"Cyrus",
    lastName: "Shahrivar",
    title: "Web developer",
    company: "565370fb61e13a0705ff6946",
    email: "cyrus@gmail.com",
    phone: "+1(646)500-6754",
    social_media_links: {
      url: "www.cyrus.com"
    }
  },
  {
    qr_code: "http://api.qrserver.com/v1/create-qr-code/?data=localhost:3000/users/own_card",
    firstName:"Kate",
    lastName: "Shishkina",
    title: "Web developer",
    company: "565370fb61e13a0705ff6946",
    email: "kate@gmail.com",
    phone: "+1(646)500-1831",
    social_media_links: {
      url: "www.kate.com"
    }
  }
];

BusinessCardInfo.collection.insert(arrayOfCardInfo, onCardInfoInsert);
function onCardInfoInsert(err, docs) {
  if (err) {
      console.log(err);
  } else {
      console.info('card info seed was successfully stored.', docs.length);
  }
}

Company.collection.insert(arrayOfCompanies, onCompaniesInsert);
function onCompaniesInsert(err, docs) {
  if (err) {
      console.log(err);
  } else {
      console.info('companies seed was successfully stored.', docs.length);
  }
}

User.collection.insert(arrayOfUsers, onUsersInsert);
function onUsersInsert(err, docs) {
  if (err) {
      console.log(err);
  } else {
      console.info('users seed was successfully stored.', docs.length);
  }
}
