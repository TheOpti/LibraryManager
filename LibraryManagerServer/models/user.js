// model: book

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login : String,
    password : String,
    email : String,
    registeredSince : new Date()
});

module.exports = mongoose.model('Book', BookSchema);