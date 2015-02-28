// model: book

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    name : String,
    description : String,
    authors : [],
    category : String,
    reviews: [{author : String, review: String, rate : Number}]
});

module.exports = mongoose.model('Book', BookSchema);