var Card = require("../models/cardModel").Card
'use strict'
const vision = require('node-cloud-vision-api')

// init with auth
vision.init({auth: 'AIzaSyCD_R3WCzQ6LEIX9N1Uw4F3u2ouNKt2TGU'})

function scanImage(req,res) {
	console.log('Scan Image Request Received andladsjf;alkdj')
	const visionReq = new vision.Request({
		image: new vision.Image(req.file.path),
		features: [
		new vision.Feature('TEXT_DETECTION', 4)
		]
	})

	//FIND THE NAME OF THE CARD



	// send single request
	vision.annotate(visionReq).then((visionRes) => {
  	// handling response
  		var title = visionRes.responses[0].textAnnotations[0].description.split("\n")[0]
  		Card.findOne({name : title }, function (err, card) {
  			if (err  || !card) return res.json({falseCard: true});
  			res.writeHead(200, {"Content-Type" : "text/json"})
  			res.end(JSON.stringify(card))
  		})
 	}, (e) => {
  		console.log('Error: ', e)
  	})
}


module.exports = {scanImage}