
/*
 * GET users listing.
 */
var User = require('../models/user.js');


exports.list = function(req, res){
  res.send("respond with a resource rrr");
};

exports.getuser = function(req, res){
	// create a new user
	/*
	var newUser = User({
		id: 4,
	  name: 'Peter Quill'
	});

	// save the user
	newUser.save(function(err) {
	  if (err) throw err;

	  console.log('User created!');
	});
	*/
	// get all the users
	User.find({}, function(err, users) {
	  if (err) throw err;

	  // object of all the users
	  console.log(users);
	  res.send('finished');
	});
	
};