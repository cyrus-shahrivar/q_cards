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
    //businesCard:['3455346465375467546754674567'],
    contacts:[],
    own_card: {
      qr_code: "http://api.qrserver.com/v1/create-qr-code/?data=http://www.qcards.com/user/1/own_card",
      firstName:"Kyle",
      lastName: "Gorjanc",
      title: "Web developer",
      //find query by company name can be used to grab more information
      company: arrayOfCompanies[0].name,
      email: "kyle@gmail.com",
      phone: "+1(646)500-3425",
      social_media_links: {
        url: "www.kyle.com"
      }
    }
  },
  {
    username: "cyrus",
    password: "potatoes",
    //businesCard:['3455346465375467546754674567'],
    contacts: [],
    own_card: {
      qr_code: "http://api.qrserver.com/v1/create-qr-code/?data=http://www.qcards.com/user/1/own_card",
      firstName:"Cyrus",
      lastName: "Shahrivar",
      title: "Web developer",
      company: arrayOfCompanies[0].name,
      email: "cyrus@gmail.com",
      phone: "+1(646)500-6754",
      social_media_links: {
        url: "www.cyrus.com"
      }
    }
  },
  {
    username: "kate",
    password: "potatoes",
    //businesCard:['3455346465375467546754674567'],
    contacts: [],
    own_card: {
      qr_code: "http://api.qrserver.com/v1/create-qr-code/?data=localhost:3000/users/own_card",
      firstName:"Kate",
      lastName: "Shishkina",
      title: "Web developer",
      company: arrayOfCompanies[1].name,
      email: "kate@gmail.com",
      phone: "+1(646)500-1831",
      social_media_links: {
        url: "www.kate.com"
      }
    }
  }
];

// var arrayOfCardInfo = [{
//     qr_code: "http://api.qrserver.com/v1/create-qr-code/?data=http://www.qcards.com/user/1/own_card",
//     firstName:"Kyle",
//     lastName: "Gorjanc",
//     title: "Web developer",
//     company: "565370fb61e13a0705ff6946",
//     email: "kyle@gmail.com",
//     phone: "+1(646)500-3425",
//     social_media_links: {
//       url: "www.kyle.com"
//     }
//   },
//   {
//     qr_code: "http://api.qrserver.com/v1/create-qr-code/?data=http://www.qcards.com/user/1/own_card",
//     firstName:"Cyrus",
//     lastName: "Shahrivar",
//     title: "Web developer",
//     company: "565370fb61e13a0705ff6946",
//     email: "cyrus@gmail.com",
//     phone: "+1(646)500-6754",
//     social_media_links: {
//       url: "www.cyrus.com"
//     }
//   },
//   {
//     qr_code: "http://api.qrserver.com/v1/create-qr-code/?data=localhost:3000/users/own_card",
//     firstName:"Kate",
//     lastName: "Shishkina",
//     title: "Web developer",
//     company: "565370fb61e13a0705ff6946",
//     email: "kate@gmail.com",
//     phone: "+1(646)500-1831",
//     social_media_links: {
//       url: "www.kate.com"
//     }
//   }
// ];

// BusinessCardInfo.collection.insert(arrayOfCardInfo, onCardInfoInsert);
// function onCardInfoInsert(err, docs) {
//   if (err) {
//       console.log(err);
//   } else {
//       console.info('card info seed was successfully stored.', docs.length);
//   }
// }

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
