// model: book

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login : String,
    password : String,
    salt: String,
    email : String,
    role : String
});

module.exports = mongoose.model('User', UserSchema);