var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	accessToken  : {type: String, required: true},
	refreshToken : {type: String, required: false},
	profile      : {
					id: {type: String, required: true},
					name: {type: String, required: true}
				   },
	votedOn : [String]
});

userSchema.statics.findOrCreate = function(parameters, callback){
    mongoose.model("User").findOne({"accessToken": parameters.accessToken}, function(err, user){
		console.log("finding or creating");
        if (err) return callback(err);
        if(user) return callback(null, user);
		console.log(parameters);
        mongoose.model('User').create(parameters, function (err, user){ 
			if(err) throw err;
			callback(err,user)
		});
    });
};

module.exports = mongoose.model('User', userSchema);
