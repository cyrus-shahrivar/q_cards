// var mongoose = require('mongoose'),
// 	passport = require('passport');
var	express = require('express'),
	  router = express.Router();
    // Sessions = require('../models/session.js');


var isAuthenticated = function(req, res, next){
	if(!req.isAuthenticated())
      res.send(401);
	else
	  next();
};

module.exports = function(passport){
		//GET login page
		router.get('/login', function(req, res){
			res.render('login-template');
      console.log('on log in page');
		});
		//Login POST
	router.post('/login', passport.authenticate('local', {
    successRedirect: '/user/',
    failureRedirect: '/',
    failureFlash: true
  }));
		//GET registration page
		router.get('/signup', function(req, res){
				res.render('settings-template', {message: req.flash('message')});
		});
		//POST to registration
		router.post('/signup', passport.authenticate('signup', {
			successRedirect: '/profile-template',
			failureRedirect: '/signup',
			failureFlash: true
		}));
		//GET Home page
		router.get('/user', isAuthenticated, function(req, res){
			res.render('profile-template', {Username: req.username});
		});

		//LOG OUT
		router.get('/signout', function(req, res){
			req.logout();
			res.redirect('/');
		});
};

module.exports = router;
