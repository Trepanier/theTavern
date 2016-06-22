var Collection=require("../models/collectionModel")

function create(req, res){
	console.log("Collection Requst Recieved")
	Collection.create(req.body, function (err, collection) {
  		if (err) return console.error(err);
		res.writeHead(200 , {"Content-Type" : "text/json"})
		res.end(JSON.stringify(collection))
	})
}//ends create

function retreiveAll(req, res){
	console.log("Get Request for All Recieved")
	Collection.find({}, function(err, collection){
		if(err) return console.error(err);
	res.writeHead(200 , {"Content-Type" : "text/json"})
	res.end(JSON.stringify(collection))
	})//end post.find
}//ends retreive

function retreiveOne(req, res){
	console.log("Get Request Recieved for ", req.params.slug)
	Collection.findOne({slug:req.params.slug}, function (err, collection) {
  		if (err) return console.error(err);
  	res.writeHead(200 , {"Content-Type" : "text/json"})
	res.end(JSON.stringify(collection))
	})//end post.findOne
}//end retreiveOne

function retreiveDate(){

}//end retreiveDate

function deletion(req, res){
	console.log("Deletion Request Recieved for ", req.params.slug)
	Collection.remove({slug:req.params.slug},function(err, collection){
		if(err) return console.error(err);
	res.writeHead(200 , {"Content-Type" : "text/json"})
	res.end(JSON.stringify("Deletion Completed"))	
	console.log("Deletion Request Completed")
	})
}//ends deletion

function change(req, res){
	console.log("Collection Request Received for", req.params.slug)
	Collection.findOneAndUpdate({slug:req.params.slug}, req.body, {new: true} ,function(err, collection){
      	if (!err) {
        	console.log("updated");
      	} else {
        	console.log(err);
      	}
      	return res.send({collection});
    	});
	}//ends change

// .findOneAndUpdate ("some sort of search", "What we want to change to" , callback function he)

module.exports = {
	create,
	retreiveAll,
	retreiveOne,
	deletion,
	change
}
