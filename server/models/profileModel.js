var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
 userName: String,
 name: String,
 description: String,
 location: String,
 age: Number,
 games: [],
 host: Boolean,
 phone: String,
 email: String,
 alcohol: Boolean,
 blockedUser: [],
 friends: [],
 skillLevel: String,
 party: []
});

var Profile = mongoose.model('profile', profileSchema);

module.exports = Profile