
// BASE SETUP
// =============================================================================

var express     = module.exports = require('express'); 		// call express
var bodyParser  = require('body-parser');
fs          = require('fs');
multer      = require('multer');
path        = require('path');
var mime        = require('mime');
var morgan      = require('morgan');

// =============================================================================
var app        = express();
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

var port = process.env.PORT || 8080; 		// set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library_manager'); // connect to our database

var Book = require('./models/book');

// ROUTES FOR OUR API
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

// ------------------------------------
//app.disable('etag');

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);

