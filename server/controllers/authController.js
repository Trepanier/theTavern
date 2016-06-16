
function login(req, res){
	return res.json({message: "You have Logged in (well at least theres text here"})
};

function logout(req,res){
	return res.json({message: "You've logged out (Again at least theres text here"})
};



module.exports = {
	login,
	logout
};