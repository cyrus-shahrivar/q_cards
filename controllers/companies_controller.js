<<<<<<< HEAD
var mongoose = require('mongoose'),
    Company = require('../models/company.js');


module.exports.controller = function(app){
  app.get('/companies', function(req, res){
    Company.find().exec(function(err, companies){
      if(err) return next(err);
      return.send(companies);
    });
  });
  

}
=======
companies_controller.js
>>>>>>> 0d3d33d6d65f16e2361491f6ac8312d57fee2a6c
