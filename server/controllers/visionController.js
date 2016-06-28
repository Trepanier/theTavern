'use strict'
const vision = require('node-cloud-vision-api')

// init with auth
vision.init({auth: 'AIzaSyCD_R3WCzQ6LEIX9N1Uw4F3u2ouNKt2TGU'})

function scanImage(requ,resp) {
	console.log('Scan Image Request Received andladsjf;alkdj')
	const req = new vision.Request({
		image: new vision.Image(requ.file.path),
		features: [
		new vision.Feature('TEXT_DETECTION', 4)
		]
	})
	// send single request
	vision.annotate(req).then((res) => {
  	// handling response
  	console.log(JSON.stringify(res.responses))
	}, (e) => {
	console.log('Error: ', e)
	}).catch((err) =>
	console.log('Errrr', err)
	)
}

module.exports = {scanImage}