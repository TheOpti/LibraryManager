
// BASE SETUP
// =============================================================================

var express     = module.exports = require('express');
var bodyParser  = require('body-parser');
fs              = require('fs');
multer          = require('multer');
path            = require('path');
var mime        = require('mime');
var morgan      = require('morgan');
var jwt         = require('jwt-simple');

// =============================================================================
var app        = express();
app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(multer(
    {
        dest: './controllers/books/',
        rename: function (fieldname, filename) {
            return filename;
        }
    }
))

var port = process.env.PORT || 8080;

var mongoose   = require('mongoose');
mongoose.set('debug', true);

mongoose.connect('mongodb://localhost:27017/library_manager');

// ROUTES FOR API
// =============================================================================
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    next();
});

var bookAPI = require('./controllers/book');
app.use('/api', bookAPI);
var pdfAPI = require('./controllers/pdf');
app.use('/api', pdfAPI);

var User = require('./models/user');

app.post('/login', function(req, res) {
    var username = req.body.login;
    var password = req.body.password;
    validateUser(req, res, username, password);
});

function validateUser(req, res, username, password) {
    User.findOne({ login: username }, function(err, user) {
        console.log(user);
        if (err || user === null) {
            console.log("there's no such user");
            return res.send("error");
        } else if (user.password === password) {

            var expires = 86400;
            var token = jwt.encode({
                iss: user.login,
                exp: expires
            }, app.get('jwtTokenSecret'));
            console.log("everything's ok");
            return res.json({
                token : token,
                expires: expires,
                user: user.login
            });
        }

    });
}


// ------------------------------------


// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);

