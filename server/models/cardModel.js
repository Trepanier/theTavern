var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
 artist: String,
 cmc: String,
 colorIdentity: [],
 colors: [],
 foreignNames: [],
 imageName: String,
 layout: String,
 legalities: [],
 manaCost: String,
 multiverseid: Number,
 name: String,
 number: String,
 originalText: String,
 originalType: String,
 power: String,
 printings: [],
 rarity: String,
 subtypes: [],
 text: String,
 toughness: String,
 type: String,
 types: []
});


module.exports = cardSchema