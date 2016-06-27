var Item = require("./itemModel")
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var collectionSchema = new Schema({
 user:  String,
 title: String,
 userKollection: [Item],
 hidden: Boolean,
 slug: String
});

var Collection = mongoose.model('kollection', collectionSchema);

module.exports = Collection
