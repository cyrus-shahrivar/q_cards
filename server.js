var express = require('express'),
    logger = require('morgan'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    app = express();

//set up middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(session({
  secret: process.env.OMDB_SECRET,
  saveUninitialized: false,
  resave: false
}));

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
  console.log('Listening on port 3000..');
});
//connect to controllers
fs.readdirSync('./controllers').forEach(function(file){
  if(file.substr(-3) == '.js'){
    route = require('./controllers' + file);
    route.controller(app);
  }
});
