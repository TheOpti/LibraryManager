// model: book

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    name : String,
    description : String,
    author : String,
    isRead : Boolean
});

module.exports = mongoose.model('Book', BookSchema);