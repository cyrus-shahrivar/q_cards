var express    = require('express'),
    logger     = require('morgan'),
    session    = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    upload     = require('formidable-upload'),
    bcrypt     = require('bcrypt'),
    fs         = require('fs-extra'),
    util       = require('util'),
    path       = require('path'),
    compression= require('compression'),
methodOverride = require('method-override'),
    Company = require('./models/company.js'),
    User       = require('./models/user.js'),
    router     = express.Router(),
    app        = express();

//set up middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(session({
  secret: "pillow",
  saveUninitialized: false,
  resave: false
  }));
// app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());
// Initialize Passport
// var initPassport = require('./passport/init');
// initPassport(passport);
app.use(compression());
//connect to mongo database called qcards_app
mongoose.connect('mongodb://localhost/q_cards_app', function (err) {
  if(err){
    console.log(err);
  } else {
    console.log('connection successful');
  }
});
//set up the app to listen on port 3000
app.listen(3000, function(){
  console.log('Listening to a frilled lizard on port 3000..');
});

var restrictAccess = function (req, res, next) {
  var sessionId = req.session.currentUser;
  var reqId = req.params.id;
  sessionId = reqId ? next() : res.status(400).send({err: 400, msg: "No access"});
};

var authenticate = function (req, res, next) {
  req.session.currentUser ? next() : res.status(403).send({err: 403, msg: "Please, log in"});
};

//probably don't need this one
app.get('/users', authenticate, restrictAccess, function(req, res) {
  User.find().exec(function (err, users) {
    res.send(users);
  });
});

//useful for contacts page?
app.get('/users/:id', authenticate, restrictAccess, function (req, res) {
  User.findById(req.params.id).exec(function (err, user) {
    res.send(user);
  });
});

//to send current session's user to app.js and subsequent view in html template
app.get('/current_user', function(req, res) {
  User.findById(req.session.currentUser).exec(function (err, person) {
    var personInfo = "First Name: " + person.own_card.firstName + " Last Name: " + person.own_card.lastName + " Email: " + person.own_card.email + " Phone: " + person.own_card.phone + " Company: " + person.own_card.company + " Title: " + person.own_card.title + " Social Media Links: " + person.own_card.social_media_links;
    User.findOneAndUpdate({_id: req.session.currentUser}, {$set: {"own_card.qr_code": "http://api.qrserver.com/v1/create-qr-code/?data=" + personInfo + " Qcard Id: " + req.session.currentUser}}, {"new": true}, function (err, user) {
      // var QRCode = user.own_card.qr_code;
      // QRCode = "http://api.qrserver.com/v1/create-qr-code/?data=" + req.session.currentUser;
      res.send(user);
    });
  });
});

//for finding contacts and displaying them
app.get('/current_user/contacts', function(req, res) {
  User.findById(req.session.currentUser).exec(function (err, user) {
    var contactsArray = [];
    var contacts = user.contacts;
//added counter, so the res.send() does not get executed before all contacts are processed
      for (var i = 0; i < contacts.length; i++){
        var counter = contacts.length;
        //  console.log("Current counter, before pushing: " + counter);
        //  console.log("This is contacts: " + contacts[i]);
        User.findById(contacts[i]).exec(function(err, person){
          contactsArray.push(person.own_card);
          counter--;
          // console.log("Counter after pushing: " + counter);
          console.log("Current array: " + contactsArray);
          if(counter == 0) res.send(contactsArray);
        })
      }
  });
});

//could be useful for building out a user's contacts
app.get('/companies', function(req, res) {
  Company.find().exec(function (err, companies) {
    res.send(companies);
  });
});

app.post('/users/update', function (req, res) {
  User.findById(req.session.currentUser).exec(function (err, data) {
    console.log(data);
    res.send(data);
    // User.findOneAndUpdate({_id: req.session.currentUser}, {$set: {"own_card.qr_code": "http://api.qrserver.com/v1/create-qr-code/?data=" + personInfo + " Qcard Id: " + req.session.currentUser}}, {"new": true}, function (err, user) {
    //   // var QRCode = user.own_card.qr_code;
    //   // QRCode = "http://api.qrserver.com/v1/create-qr-code/?data=" + req.session.currentUser;
    //   res.send(user);
    // });



  });
});

//creates a new user
app.post('/users', function (req, res) {
  var user = new User(req.body);
  console.log(req.body);
  user.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('User saved');
      res.send(user);
    }
  });
});

//creates a new company
app.post('/companies', function (req, res) {
  var company = new Company(req.body);
  company.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Company saved');
      res.send(company);
    }
  });
})

//what is this for?
app.post('/compareUser', function (req, res) {
  User.find({username: req.body.username}).exec(function (err, user) {
    var currentUser = user[0];
    currentUser.comparePassword(req.body.password, function (err, isMatch) {
      if(isMatch) {
        res.send(currentUser);
      } else {
        res.send(err);
      }
    });
  });
});

//this is used for initial login
app.post('/sessions', function (req, res) {
  User.find({username: req.body.username}).exec(function (err, user) {
    user[0].comparePassword(req.body.password, function (err, isMatch) {
      if(isMatch) {
        req.session.currentUser = user[0]._id;
        res.send('This user successfully logged in: ' + user[0].username);
      } else {
        res.status(400);
        res.send({
          err: 400,
          msg: 'incorrect password'
        });
      }
    });
  });
});

//we're still working on getting this working
app.delete('/sessions', function (req,res) {
  req.session.currentUser = null;
  console.log("delete route hit");
  res.send("Deleting session");
});
