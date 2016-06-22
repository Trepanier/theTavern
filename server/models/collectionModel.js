var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var collectionSchema = new Schema({
 user:  String,
 title: String,
 kollection: [],
 date: { type: Date, default: Date.now },
 hidden: Boolean,
 slug: String
});

var Collection = mongoose.model('kollection', collectionSchema);

module.exports = Collection