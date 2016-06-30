var Card = require('../models/cardModel')

function findOne() {
	console.log("Get Request Received for ", req.params.slug)
	Card.findOne({slug:req.params.slug}, function (err, card) {
  		if (err) return console.error(err);
  	res.writeHead(200 , {"Content-Type" : "text/json"})
	res.end(JSON.stringify(card))
	})
}

module.exports = {findOne}