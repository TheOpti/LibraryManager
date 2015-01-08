
// BASE SETUP
// =============================================================================

var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/library_manager'); // connect to our database

var Book = require('./models/book');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});


router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');

    console.log(req.method, req.url);
    next();
});

// more routes for our API will happen here
router.route('/books')
    .post(function(req, res) {
        //console.log(req.body);
        var book = new Book(); 		// create a new instance of the Bear model
        book.name = req.body.name;  // set the bears name (comes from the request)
        book.author = req.body.author;
        book.isRead = req.body.isRead;
        book.description = req.body.description;
        //next();
        console.log(book);
        // save the bear and check for errors
        //book.save(function(err) {
        //    if (err)
        //        res.send(err);
        //
        //    res.json({
        //        message: 'Book created! ' + book
        //    });
        //})
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
    // get the book with that id (accessed at GET http://localhost:8080/api/books/:bookId)
    .get(function(req, res) {
        Book.findById(req.params.bookId, function(err, book) {
            if (err)
                res.send(err);
            res.json(book);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Book.findById(req.params.bookId, function(err, book) {
            if (err)
                res.send(err);

            book.name = req.body.name;
            book.author = req.body.author;
            book.isRead = req.body.isRead;
            book.description = req.body.description;

            // save the bear
            book.save(function(err) {
                if (err)
                    res.send(err);

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

