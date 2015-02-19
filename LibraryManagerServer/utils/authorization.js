var express = require('express');

var User = require('../models/user');

module.exports = (function() {
    var router = express.Router();

    app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');

    router.route('/login')
        .post(function (req, res) {
            var username = req.body.login;
            var password = req.body.password;
            User.findOne({login: username}, function (err, user) {
                if (err || user === null) {
                    console.log("there's no such user");
                    return res.json({
                        error: "Incorrect user or password!"
                    });
                } else if (user.password === password) {

                    var expires = 86400;
                    var token = jwt.encode({
                        iss: user.login,
                        exp: Date.now() + 86400000
                    }, app.get('jwtTokenSecret'));

                    return res.json({
                        token: token,
                        expires: expires,
                        user: user.login
                    });
                }
            });
        });

    return router;

})();

