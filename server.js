var express = require('express'),
    logger = require('morgan'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    // bcrypt = require('bcrypt'),
    // router = express.Router(),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    // User = require('./models/user.js'),
    companies = require('./controllers/companies_controller.js'),
    users =  require('./controllers/users_controller.js'),
    sessionsController = require('./controllers/sessions_controller.js'),
    app = express();

//set up middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(passport.initialize());
app.use(passport.session());


// app.use(session({
//   secret: "my favorite pillow",
//   saveUninitialized: false,
//   resave: false
// }));

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

app.use('/', sessionsController);
app.use('/users', users);
app.use('/companies', companies);
