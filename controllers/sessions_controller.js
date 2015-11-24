// var mongoose = require('mongoose'),
// 	passport = require('passport');
// 	//express = require('express'),
// 	router = express.Router();
//     // Sessions = require('../models/session.js');
//
//
// var isAuthenticated = function(req, res, next){
// 	if(req.isAuthenticated()) return next();
//
// 	res.redirect('/');
// };
//
// module.exports.controller = function(passport){
// 		//GET login page
// 		router.get('/', function(req, res){
// 			res.render('index', {message: req.flash('Please, log in')});
// 		});
// 		//Login POST
// 		router.post('/login', passport.authenticate('login',{
// 			successRedirect: '/home',
// 			failureRedirect: '/',
// 			failureFlash: true
// 		}));
// 		//GET registration page
// 		router.get('/signup', function(req, res){
// 				res.render('register', {message: req.flash('message')});
// 		});
// 		//POST to registration
// 		router.post('/signup', passport.authenticate('signup', {
// 			successRedirect: '/home',
// 			failureRedirect: '/signup',
// 			failureFlash: true
// 		}));
// 		//GET Home page
// 		router.get('/home', isAuthenticated, function(req, res){
// 			res.render('home', {user: req.user});
// 		});
//
// 		//LOG OUT
// 		router.get('/signout', function(req, res){
// 			req.logout();
// 			res.redirect('/');
// 		});
// };
//
// // module.exports = router;
