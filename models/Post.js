var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	tagline: {type: String, required: true},
	image :  {type: Buffer, required: false},
	points : {type: Number, required: true},
});

module.exports = mongoose.model('Post', postSchema);

