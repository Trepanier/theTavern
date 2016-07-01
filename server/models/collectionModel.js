var cardSchema = require("./cardModel").cardSchema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//import { cardSchema } from "./cardModel"

var collectionSchema = new Schema({
 user:  String,
 title: String,
 userKollection: [cardSchema],
 hidden: Boolean,
 slug: String
});

var Collection = mongoose.model('kollection', collectionSchema);

module.exports = Collection
