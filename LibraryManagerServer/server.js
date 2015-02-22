
// BASE SETUP
// =============================================================================

var express     = module.exports = require('express');
var bodyParser  = require('body-parser');
fs              = require('fs');
multer          = require('multer');
path            = require('path');
var mime        = require('mime');
var morgan      = require('morgan');
jwt         = require('jwt-simple');

// =============================================================================
app = express();

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
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, content-type, accept, auth_bearer');
    next();
});

app.disable('etag');

var utils = require('./utils/utils');

var authorization = require('./utils/authorization');

var bookAPI = require('./controllers/book');
var pdfAPI = require('./controllers/pdf');

app.use('/', authorization);

//app.use(utils.ensureAuthorized);

app.use('/api', bookAPI);
app.use('/api', pdfAPI);

// ------------------------------------

// START THE SERVER
app.listen(port);
console.log(utils.getCurrentTime() + ' Magic happens on port ' + port);

