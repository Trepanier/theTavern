// 'use strict'
// const vision = require('node-cloud-vision-api')

// // init with auth
// vision.init({auth: 'AIzaSyCD_R3WCzQ6LEIX9N1Uw4F3u2ouNKt2TGU'})

function scanImage() {
	console.log('Scan Image Request Received andladsjf;alkdj')
	return {}
}
// construct parameters
// const req = new vision.Request({
//   image: new vision.Image('/Users/minakomay/mtcs/myblog/app/images/MagicExample.jpg'),
//   features: [
//     new vision.Feature('TEXT_DETECTION', 4)
//   ]
// })
// console.log("consolelog")
// // send single request
// vision.annotate(req).then((res) => {
//   // handling response
//   console.log("consolelog2")
//   console.log(JSON.stringify(res.responses))
// }, (e) => {
//   console.log('Error: ', e)
// }).catch((err) =>
// 	console.log('Errrr', err)
// )

module.exports = {scanImage}