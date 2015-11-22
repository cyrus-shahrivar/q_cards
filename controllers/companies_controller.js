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
companies_controller.js

