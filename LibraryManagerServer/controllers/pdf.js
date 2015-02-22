var express     = require('express');
var fs          = require('fs');

var relativePath = "./controllers/books";

module.exports = (function() {
    var router = express.Router();

    router.route('/pdf')
        .get(function(req, res) {
            var listOfPDFs = [];
            fs.readdir(relativePath, function (err, files) {
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
                console.log(listOfPDFs);
                res.json(listOfPDFs);
            })
        })

        .post([ multer({ dest: '/books/'}), function(req, res) {
            res.status(204).end()
        }]);

    router.route('/pdf/:filename')
        .get(function(req, res) {
            console.log("w funkcji");
            console.log(__dirname);
            var file = __dirname + '/books/' + req.params.filename;
            res.download(file);
        })


    return router;
})();
