var Card = require('../models/cardModel').Card

function findOne(req, res) {
	console.log("Get Request Received for ", req.params.slug)
	Card.findOne({name : req.params.slug}, function (err, card) {
		if (err) return console.error(err);
		res.writeHead(200 , {"Content-Type" : "text/json"})
		if (card === null){
			res.end(JSON.stringify({failed: true}))
		}else{
			res.end(JSON.stringify(card))
		}
	})
}

module.exports = {findOne}