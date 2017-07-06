var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  mongodb = require('mongodb').MongoClient;

 
module.exports = function () {
	//===the local strategy is an object so we are using it as that
	passport.use(new LocalStrategy({
		usernameField: 'usernameField',
		passwordField: 'passwordField'
	},
	//====implementing the local strategy function===
	function(username, password, done){
		var url = 'mongodb://localhost:27017/libaryApp';
		mongodb.connect(url, function (err, db) {
			var collection = db.collection('users')
			collection.findOne({username: username}, 
			    function(err, results) {
			    	if (results.password === password) {
				    	var user = results;
				    	done(null, user);
			    	} else {
			    		done(null, false, {message: 'Bad Password'});
			    	}
			    	console.log(`error from local strategy ${err}`);
			    }
			)
		})
	}));
};