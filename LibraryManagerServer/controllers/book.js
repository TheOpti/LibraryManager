var express = require('express');

var Book = require('../models/book');

module.exports = (function() {
    var router = express.Router();

    router.route('/books')
        .post(function(req, res) {
            //console.log(req.body);
            var book = new Book();
            book.name = req.body.name;
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

    return router;
})();
