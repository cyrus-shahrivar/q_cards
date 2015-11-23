var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function() {
                // find a user in Mongo with the provided username
                User.findOne( { 'username' :  username }, function(err, user) {
                    // In case of error, return using the done method
                    if (err){
                        console.log('Error in SignUp: ' + err);
                        return done(err);
                    }
                    // user with same username already exists
                    if (user) {
                        console.log('User already exists with username: ' + username);
                        return done(null, false, req.flash('message', username + 'already exists. Please choose a different username.'));
                    } else {
                        // if there is no user with that username, create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');
                        newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName');
                        newUser.phone = req.param('999-999-9999');
                        newUser.company = req.param('company');
                        newUser.title = req.param('title');

                        // save the user
                        newUser.save(function(err) {
                            if (err) {
                                console.log('Error in Saving user: ' + err);  
                                throw err;  
                            } else {
                            console.log('User Registration succesful');    
                            return done(null, newUser);
                            };
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}

//Code shamelessly copied over from http://code.tutsplus.com/tutorials/build-a-complete-mvc-website-with-expressjs--net-34168.  I went through it with a fine-tooth comb to ensure its compatibility with our code. -KMG