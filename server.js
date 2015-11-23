var express = require('express'),
    logger = require('morgan'),
    session = require('express-session'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    router = express.Router(),
    fs = require('fs'),
    companies = require('./controllers/companies_controller.js'),
    users =  require('./controllers/users_controller.js'),
    sessions = require('./controllers/sessions_controller.js'),
    app = express();

//set up middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/bower_components/', express.static(__dirname + '/bower_components/'));
app.use(session);
// secret saveUninitialized, etc...
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

//connect to mongo database called qcards_app
mongoose.connect('mongodb://localhost/qcards_app', function (err) {
  if(err){
    console.log(err);
  }else {
    console.log('connection successful');
  }
});
//set up the app to listen on port 3000
app.listen(3000, function(){
  console.log('Listening to a frilled lizard on port 3000..');
});
//this command will tell javascript to go in order.
//And if the file substring is javascirpt, it will route us there and use that file as a controller.


// app.use('/', sessions);
app.use('/', users);
app.use('/', companies);

// THIS IS CAUSING A BUG. FOR SOME REASON THE SERVER ISN'T FINDING './controllers/:file'
// fs.readdirSync('./controllers').forEach(function(file) {
//   if (file.substr(-3) == '.js') {
//     route = require('./controllers/' + file) (passport);
//     route.controller(app);
//   }
// });
