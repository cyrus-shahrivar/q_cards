var mongoose = require('mongoose'),
    User = require('../models/user.js'),
    express = require('express'),
    router = express.Router();

    router.get('/id/:id', function(req, res) {
        User.findById(req.params.id).exec(function(err, user) {
            res.send(user);
        });
    });

    router.get('/name/:name', function(req, res) {
        User.findOne({
            lastName: req.params.name
        }).exec(function(err, user) {
            res.send(user);
        });
    });

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
