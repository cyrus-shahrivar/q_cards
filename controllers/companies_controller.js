var mongoose = require('mongoose'),
    Company = require('../models/company.js'),
    express = require('express'),
    router = express.Router();


//should return a company by searching
router.get('/:name', function(req, res) {
    var companyName = decodeURI(req.params.name);
    Company.findOne({
        name: companyName
    }).exec(function(err,company) {
        if (err) return next(err);
        //trying to print the company to console first, before sending to the page
        console.log(company);
        res.send(company);
        //populate the contacts associated with the company
        // var queryUser = User.find({});
        // //search through users with specified company
        // queryUser.where('company', company._id);
        // //print only name and position to the screen
        // //I'm a little confused about the difference between .populate('name') and .select('name')
        // //ok, populate() is for newly created objects that reference other objects, so you specify
        // //which fields you would want to insert values into other table
        // queryUser.select('name', 'position');
        // queryUser.exec(function(users){
        //   if(err) return next(err);
        //   console.log(users);
    });
});

//should list all companies
router.route('/')
    .get(function(req, res) {
        Company.find({}, function(err, companies) {
            if (err) return next(err);
            return res.send(companies);
        });
    })
    .post(function(req, res) {
        var company = new Company(req.body);
        console.log("partially working");
        company.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Company saved.");
                res.send("hi");
            }
        });
    });


module.exports = router;
