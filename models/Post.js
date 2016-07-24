var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	tagline: {type: String, required: true},
	image :  {type: Buffer, required: false},
	points : {type: Number, required: true},
	userid: {type: String, required: true},
	name: {type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema);

