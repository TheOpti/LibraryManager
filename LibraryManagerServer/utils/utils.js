
module.exports = (function() {

    var utils = {  };

    utils.ensureAuthorized = function(req, res, next) {
        try {
            console.log("autoryzacja");
            var token = req.headers['auth_bearer'];
            console.log("token: " + token);
            var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
            console.log(decoded);
        } catch (err) {
            res.statusCode = 400;
            res.send({ error: 'There was an error during token validation' });
        }

        
        if (decoded.exp <= Date.now()) {
            console.log("1:" + decoded.exp );
            console.log("2:" + Date.now() );

            res.statusCode = 400;
            res.send({ error: 'Token has expired - log in again' });
        } else {
            next();
        }
    };

    utils.getCurrentTime = function() {
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
    };

    return utils;

})();