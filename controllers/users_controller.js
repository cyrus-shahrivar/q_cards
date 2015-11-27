var mongoose = require('mongoose'),
    User = require('../models/user.js'),
    express = require('express'),
    qr = require('../helpers/qrGenerator.js'),
    router = express.Router();

    //select user by id, gives just own_card info
    router.get('/id/:id', function(req, res) {
        User.findById(req.params.id).select('own_card').exec(function(err, user) {
            res.send(user);
        });
    });

    //select user by name, gives just own_card info
    router.get('/name/:name', function(req, res) {
        User.findOne({
            'own_card.lastName': req.params.name
        }).select('own_card').exec(function(err, user) {
            res.send(user);
        });
    });

    //select user by username, gives just own_card info
    router.get('/username/:username', function(req, res) {
        User.findOne({
            username: req.params.username
        }).select('own_card').exec(function(err, user) {
            res.send(user);
        });
    });

    //gets all users & creates a new user
    router.route('/')
        .get(function(req, res) {
            User.find().exec(function(err, users) {
                res.send(users);
            });
        })
        .post(function(req, res) {
            var user = new User(req.body);
            user.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("User saved.");
                }
            });
        });

module.exports = router;
