var express = require('express'),
    logger = require('morgan'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    router = express.Router(),
    fs = require('fs'),
    app = express();

//set up middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/bower_components/', express.static(__dirname + '/bower_components/'));
app.use(session);

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

// app.use('/', Sessions);
app.use('/', Users);
app.use('/', Companies);

// THIS IS CAUSING A BUG. FOR SOME REASON THE SERVER ISN'T FINDING './controllers/:file'
// fs.readdirSync('./controllers').forEach(function(file) {
//   if (file.substr(-3) == '.js') {
//     route = require('./controllers/' + file);
//     route.controller(app);
//   }
// });
