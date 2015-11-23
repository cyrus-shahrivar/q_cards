var mongoose = require('mongoose'),
    User = require('../models/user.js'),
    express = require('express'),
    router = express.Router();

module.exports.controller = function(app){
      app.get('/users', function(req, res) {
        User.find().exec(function (err, users) {
          res.send(users);
        });
      });

      app.get('/users/:id', function(req, res) {
        User.findById(req.params.id).exec(function(err, user) {
          res.send(user);
        });
      });

      app.post('/users/', function(req, res) {
        var user = new User(req.body);
        user.save(function(err) {
          if (err) {
            console.log(err)
          } else {
            console.log("User saved.");
          }
        });
      });

};

module.exports = router;

///////// Kate's code ////////
      // app.get('/contacts', function(req, res){
      //   var currentUser = ""
      //   var contact = ""
      //   //if User.session.id === current.Session.id;
      //     //User === currentUser;
      //   //else
      //     //User === contact
      //   contact.find().exec(function(err, contacts){
      //     if(err) return next(err);
      //     res.send(contacts);
      //   });
      // });


      
      //   "/user" is the current user, right? So when I try to add a new card, it will be added to the current user id
      //therefore, do I need to specify the id?
      // app.post('/user/:id/newContact', function(req, res){
      //   var current_user = User.findById(req.params.id);
      //   var user_im_trying_to_save = 
      //     })
      //   })
      // })





/*
app.get('/api/users', checkUser, db, routes.users.getUsers);
app.get('/api/users/:id', checkUser, db,routes.users.getUser);
app.post('/api/users', checkAdmin, db, routes.users.add);
app.put('/api/users/:id', checkAdmin, db, routes.users.update);
app.del('/api/users/:id', checkAdmin, db, routes.users.del);

exports.checkUser = function(req, res, next) {
  if (req.session && req.session.auth && req.session.userId
    && (req.session.user.approved || req.session.admin)) {
    console.info('Access USER: ' + req.session.userId);
    return next();
  } else {
    next('User is not logged in.');
  } 
};*/