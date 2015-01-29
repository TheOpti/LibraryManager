
// BASE SETUP
// =============================================================================

var express     = require('express'); 		// call express
var bodyParser  = require('body-parser');
var fs          = require('fs');
var multer      = require('multer');
var path        = require('path');
var mime        = require('mime');
var morgan      = require('morgan');

var path = "./books";

// =============================================================================
var app        = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(multer(
    {
        dest: './books/',
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
var router = express.Router(); 				// get an instance of the express Router

function getDateTime() {
    var now     = new Date();
    var year    = now.getFullYear();
    var month   = now.getMonth()+1;
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds();
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
    return dateTime;
}

router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    next();
});

router.route('/pdf')
    .get(function(req, res) {
        var listOfPDFs = [];
        fs.readdir(path, function (err, files) {
            if (err) {
                throw err;
            }
            files.forEach(function(item) {
                listOfPDFs.push(
                    {
                        "name" : item.split(".")[0],
                        "extension" : item.split(".")[1]
                    }
                )
            })
            res.json(listOfPDFs);
        })
    })
    .post([ multer({ dest: './books/'}),
        function(req, res) {
            res.status(204).end()
        }
    ]);

router.route('/pdf/:filename')
    .get(function(req, res) {
        var file = __dirname + '/Books/' + req.params.filename;
        res.download(file); // Set disposition and send it.
    })



// more routes for our API will happen here
router.route('/books')
    .post(function(req, res) {
        //console.log(req.body);
        var book = new Book(); 		// create a new instance of the Bear model
        book.name = req.body.name;  // set the bears name (comes from the request)
        book.author = req.body.author;
        book.isRead = req.body.isRead;
        book.description = req.body.description;

        book.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: 'Book created! ' + book
            });
        })
    })

    .get(function(req, res) {
        Book.find(function(err, books) {
            if (err)
                res.send(err);

            res.json(books);
        });
    });
// ------------------------------------

router.route('/books/:bookId')

    .get(function(req, res) {
        Book.findById(req.params.bookId, function(err, book) {
            if (err)
                res.send(err);
            res.json(book);
        });
    })

    .put(function(req, res) {
        Book.findById(req.params.bookId, function(err, book) {
            if (err)
                res.send(err);

            book.name = req.body.name;
            book.author = req.body.author;
            book.isRead = req.body.isRead;
            book.description = req.body.description;

            book.save(function(err) {
                if (err)
                    res.send(err);

                console.log(getDateTime(), "Book edited!", " Title: " + book.name);
                res.json({ message: 'Book updated!' + book});
            });
        });
    })

    .delete(function(req, res) {
        Book.remove({
            _id: req.params.bookId
        }, function(err, book) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted: ' + book});
        });
    });

// ------------------------------------

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.disable('etag');


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

