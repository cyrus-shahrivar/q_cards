var mongoose = require('mongoose'),
    Company = require('../models/company.js'),
    express = require('express'),
    router = express.Router();


module.exports.controller = function(app){
  //should list all companies
  app.get('/companies', function(req, res){
    Company.find({}, function(err, companies){
      if(err) return next(err);
      return res.send(companies);
    });
  });
  //should return a company by searching
  app.get('/companies/:name', function(req, res){
    Company.findOne({name: req.params.name}).exec(function(company){
        if(err) return next(err);
        //trying to print the company to console first, before sending to the page
        console.log(company);
        //populate the contacts associated with the company
        var queryUser = User.find({});
        //search through users with specified company
        queryUser.where('company', company._id);
        //print only name and position to the screen
        //I'm a little confused about the difference between .populate('name') and .select('name')
        //ok, populate() is for newly created objects that reference other objects, so you specify
        //which fields you would want to insert values into other table
        queryUser.select('name', 'position');
        queryUser.exec(function(users){
          if(err) return next(err);
          console.log(users);
        });
    });

  });


}

module.exports = router;
