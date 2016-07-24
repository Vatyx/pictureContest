'use strict'

var Listing = require('../models/Listing.js');

var listingController = {};

listingController.getAll = function(req, res, next) {
	console.log("Hello");
	Listing.find({}, function(err, listings) {
		res.json(listings);	
	});
}

listingController.create = function(req, res, next) {
	console.log(req.body);
	var listing = new Listing({
		name: req.body.name,
		prize: req.body.prize,
		posts: []

	});

	listing.save(function(err) {
		if(err) throw err;
		console.log("Oh wow first try");
		res.send("Oh wow first try");
	});
}

listingController.addPost = function(req, res, next) {
	Listing.addPostToListing(req.body.listing_id, req.body.tagline);
	res.send("Uploaded");
}

listingController.upvotePost = function(req, res, next) {
	Listing.upvotePost(req.body.listing_id, req.body.post_id);
	res.send("Upvoted");
}


module.exports = listingController;
