passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findbyId(id, function(err, user) {
		done(err, user);
	});
});

passport.use('login', new LocalStrategy({
	passReqtoCallback : true
   },
   function(req, )
   ))
