
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

// more routes for our API will happen here
router.route('/books')

    .post(function(req, res) {
        var book = new Book(); 		// create a new instance of the Bear model

        book.name = req.body.name;  // set the bears name (comes from the request)
        book.author = req.body.author;
        book.isRead = req.body.isRead;
        book.description = req.body.description;

        console.log(book);

        // save the bear and check for errors
        book.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: 'Book created!'
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


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

