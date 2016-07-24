var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	accessToken  : {type: String, required: true},
	refreshToken : {type: String, required: true},
	profile      : {type: String, required: true},
	votedOn : [String]
});

userSchema.statics.findOrCreate = function(parameters, callback){
    mongoose.model("User").findOne({"accessToken": parameters.accessToken}, function(err, user){
		console.log("Ayo this ran");
        if (err) return callback(err);
        if(user) return callback(null, user);
        mongoose.model('User').create(parameters, function (err, user){ callback(err,user)});
    });
};

module.exports = mongoose.model('User', userSchema);
