'use strict'

var Listing = require('../models/Listing.js');
var fs = require('fs');

var listingController = {};

listingController.getAll = function(req, res, next) {
	console.log(req.user);
	Listing.find({}, function(err, listings) {
		res.json(listings);	
	});
}

listingController.create = function(req, res, next) {
	console.log(req.file);
	var listing = new Listing({
		name: req.body.name,
		prize: req.body.prize,
		image: fs.readFileSync(req.file.path),
		posts: []

	});

	listing.save(function(err) {
		if(err) throw err;
		res.send("Created new listing");
	});
}

listingController.addPost = function(req, res, next) {
	Listing.addPostToListing(req.body.listing_id, req.body.tagline, req.file.path);
	res.send("Uploaded");
}

listingController.upvotePost = function(req, res, next) {
	Listing.upvotePost(req.body.listing_id, req.body.post_id);
	res.send("Upvoted");
}


module.exports = listingController;
