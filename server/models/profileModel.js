var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
 userName: String,
 name: String,
 description: String,
 location: String,
 age: String,
 games: [],
 host: String,
 phone: String,
 email: String,
 alcohol: String,
 blockedUser: [],
 friends: [],
 skillLevel: String,
 party: []
});

var Profile = mongoose.model('profile', profileSchema);

module.exports = Profile