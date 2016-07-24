var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
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
		callbackURL: "http://localhost:3000/auth/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		 mongoose.model('User')
			 .findOrCreate({accessToken: accessToken, 
				 			refreshToken: refreshToken, 
							profile: profile.id, 
							votedOn: []},
		function (err, user) {
			console.log("calling callback");
			return done(err, user);
		});
	}));

router.get('/', passport.authenticate('facebook'));

router.get('/callback', passport.authenticate('facebook', { successRedirect: '/loggedIn', failureRedirect: '/'}));

router.post('/logout', function(req, res){
    req.session.destroy();
    res.status(200).send({ "message": "Logout successful" });
});


module.exports = router;
