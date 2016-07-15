var Profile = require('../models/profileModel')

function retrieveOne(req, res) {
	console.log("Get Request Received for ", req.params.slug)
	Profile.findOne({user:req.params.slug}, function(err, profile) {
		if(err) return console.log(err);
		res.writeHead(200, {"Content-Type": "text/json"})
		res.end(JSON.stringify(profile))
	})
}

module.exports = { retrieveOne }