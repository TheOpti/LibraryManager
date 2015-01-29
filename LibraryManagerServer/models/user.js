// model: book

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login : String,
    password : String,
    email : String,
    registeredSince : new Date(),
    role : String,
    booksAdded : Number
});

module.exports = mongoose.model('User', UserSchema);