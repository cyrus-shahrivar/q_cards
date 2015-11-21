<<<<<<< HEAD
var mongoose = require('mongoose'),
    User = require('../models/user.js');

module.exports.controller = function(app){
      app.get('/contacts', function(req, res){
        User.find().exec(function(err, contacts){
          if(err) return next(err);
          res.send(contacts);
        });
      });
      //   "/user" is the current user, right? So when I try to add a new card, it will be added to the current user id
      //therefore, do I need to specify the id?
      app.post('/user/:id/newContact', function(req, res){
        var current_user = User.findById(req.params.id);
        
          })
        })
      })


}
=======
users_controller.js
>>>>>>> 0d3d33d6d65f16e2361491f6ac8312d57fee2a6c
