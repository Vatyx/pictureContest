var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
		clientID: 608592362644010,
		clientSecret: "19d512f750a35c39ab90ec976652adff",
		callbackURL: "http://picturecontest.herokuapp.com/auth/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		console.log("In auth");
		 mongoose.model('User')
			 .findOrCreate({accessToken: accessToken, 
				 			refreshToken: refreshToken, 
							profile: profile, 
							votedOn: null},
		function (err, user) {
			return done(err, user);
		});
	}));

router.get('/', passport.authenticate('facebook'));

router.get('/callback', passport.authenticate('facebook', { failureRedirect: '/'}));

module.exports = router;
