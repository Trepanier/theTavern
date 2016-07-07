var Collection=require("../models/collectionModel")

//Usable functions
function filterOne(arrN, filtinfo){
	var skip = false
	return arrN.reduce(function(prev, curr){
		if(skip || !filtinfo(curr)){
			console.log("Prev= ", prev," Curr= ", curr)
			return prev.concat(curr)
		}else{
			skip = true
			return prev
		}
	},[])
}

//End usable functions

function create(req, res){
	console.log('here\'s your file info', req.file)
	console.log("Collection Request Received")
	Collection.create(req.body, function (err, collection) {
		if (err) return console.error(err);
		res.writeHead(200 , {"Content-Type" : "text/json"})
		res.end(JSON.stringify(collection))
	})
}//ends create

function retrieveAll(req, res){
	console.log("Get Request for All Received")
	Collection.find({}, function(err, collection){
		if(err) return console.error(err);
		res.writeHead(200 , {"Content-Type" : "text/json"})
		res.end(JSON.stringify(collection))
	})//end post.find
}//ends retrieve

function retrieveOne(req, res){
	console.log("Get Request Received for ", req.params.slug)
	Collection.findOne({user:req.params.slug}, function (err, collection) {
		if (err) return console.error(err);
		res.writeHead(200 , {"Content-Type" : "text/json"})
		res.end(JSON.stringify(collection))
	})//end post.findOne
}//end retrieveOne


function deletion(req, res){
	console.log("Deletion Request Received for ", req.params.slug)
	Collection.remove({slug:req.params.slug},function(err, collection){
		if(err) return console.error(err);
		res.writeHead(200 , {"Content-Type" : "text/json"})
		res.end(JSON.stringify("Deletion Completed"))	
		console.log("Deletion Request Completed")
	})
}//ends deletion

function updateChange(req, res){
	console.log("Collection Request Received for", req.params.slug)
	Collection.findOneAndUpdate({slug:req.params.slug}, req.body.collection, {new: true} ,function(err, collection){
		if (!err) {
			console.log("updated");
		} else {
			console.log(err);
		}
		return res.send({collection});
	});
}//ends change

function addItem(req, res){
	Collection.findOne({user: req.params.slug}, function(err, collection) {
		console.log('req.body', req.body)
		collection.userKollection.push(req.body)
		collection.save(function(err, saveResp) {
			if (!err) {
				console.log("updated");
			} else {
				console.log(err);
			}
			return res.json(saveResp)
		})
	})
}

function removeItem(req, res) {
	console.log('req.body', req.body)
	Collection.findOne({user: req.body.user}, function(err, collection) {
		console.log('req.body!!!!!', req.body)
		collection.userKollection = filterOne(collection.userKollection, (obj) => obj.name === req.body.name)
		collection.save(function(err, saveResp) {
			if (!err) {
				console.log("updated");
			} else {
				console.log(err);
			}
			return res.json(collection.userKollection)
		})
	})
}

module.exports = {
	create,
	retrieveAll,
	retrieveOne,
	deletion,
	updateChange,
	addItem,
	removeItem
}
