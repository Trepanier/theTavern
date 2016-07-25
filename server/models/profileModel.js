var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
 userName: {type: String, required: true},
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
 party: [],
 availability: {},
 dm: Boolean,
 player: {type: Boolean, default: true}
})

var Profile = mongoose.model('profile', profileSchema);

module.exports = Profile