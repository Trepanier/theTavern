var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
 title: String,
 category: String,
 description: String,
 rarity: String,
 condition: String,
 img: String,
 slug: String
});


module.exports = itemSchema
