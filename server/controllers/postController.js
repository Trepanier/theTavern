var Post=require("../models/postModel")

function create(req, res){
	console.log("Post Requst Recieved")
	Post.create(req.body, function (err, post) {
  		if (err) return console.error(err);
		res.writeHead(200 , {"Content-Type" : "text/json"})
		res.end(JSON.stringify(post))
	})
}//ends create

function retreiveAll(req, res){
	console.log("Get Request for All Recieved")
	Post.find({}, function(err, post){
		if(err) return console.error(err);
	res.writeHead(200 , {"Content-Type" : "textjson"})
	res.end(JSON.stringify(post))
	})//end post.find
}//ends retreive

function retreiveOne(req, res){
	console.log("Get Request Recieved for ", req.params.slug)
	Post.findOne({slug:req.params.slug}, function (err, post) {
  		if (err) return console.error(err);
  	res.writeHead(200 , {"Content-Type" : "text/json"})
	res.end(JSON.stringify(post))
	})//end post.findOne
}//end retreiveOne

function retreiveDate(){

}//end retreiveDate

function deletion(req, res){
	console.log("Deletion Request Recieved for ", req.params.slug)
	Post.remove({slug:req.params.slug},function(err, post){
		if(err) return console.error(err);
	res.writeHead(200 , {"Content-Type" : "text/json"})
	res.end(JSON.stringify("Deletion Completed"))	
	console.log("Deletion Request Completed")
	})
}//ends deletion

function change(req, res){
	console.log("Post Request Received for", req.params.slug)
	Post.findOneAndUpdate({slug:req.params.slug}, req.body, {new: true} ,function(err, post){
      	if (!err) {
        	console.log("updated");
      	} else {
        	console.log(err);
      	}
      	return res.send({post});
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
