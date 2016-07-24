var mongoose = require('mongoose');

var Post = require('../models/Post.js');
var User = require('../models/User.js');

var listingSchema = mongoose.Schema({
	name  : {type: String, required: true},
	prize : {type: String, required: true},
	image : {type: Buffer, contentType: String, required: false},
	posts : [Post.schema]
});

var allListings = []

listingSchema.statics.initListings = function() {
	this.find({}, function(err, listings) {
		console.log("Got all listings");
		allListings = listings;
	});
}

listingSchema.statics.getAll = function() {
	return allListings;
}

listingSchema.statics.addPostToListing = function(listing_id, tagline, path) {
	this.findById(listing_id, function(err, listing) {
		if(err) throw err;

		listing.posts.push(new Post({
			tagline: tagline,
			image: fs.readFileSync(path),
			points: 0,
			userid: req.user.profile.id,
			name: req.user.profile.name
		}));

		listing.save(function(err) {
			if(err) throw err;
			console.log("Successfully saved");
		});
	});
}

listingSchema.statics.upvotePost = function(listing_id, post_id) {
	this.findById(id, function(err, listing) {
		for(var i = 0; i < listing.posts.length; i++) {
			if(posts[i]._id = post_id) {
				posts[i].points++;

				listing.save(function(err) {
					if(err) throw err;
					console.log("Upvoted post");
					User.findOne({profile: req.user.profile}, function(err, user) {
						if(err) throw err;
						user.votedOn.push(post_id);
						user.save(function(err) {
							if(err) throw err;
						});
					});
					return;
				});
			}
		}
	});
}

module.exports = mongoose.model('Listing', listingSchema);
