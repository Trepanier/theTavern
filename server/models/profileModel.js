var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
 UserName: String,
 Name: String,
 Description: String,
 Location: String,
 Age: Number,
 Games: [],
 Host: Boolean,
 Phone: String,
 Email: String,
 Alcohol: Boolean,
 BlockedUser: [],
 Friends: [],
 SkillLevel: String,
 Party: []
});

var Profile = mongoose.model('profile', profileSchema);

module.exports = Profile