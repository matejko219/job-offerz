/**
 * Created by DELL on 2017-10-07.
 */
var jwt = require('jsonwebtoken');

var jwtGuard = function(req, res, next) {

    var token = req.headers['authorization'];

    if (token) {
        // verifies secret and checks exp
        token = token.substring(7, token.length);
        jwt.verify(token, req.app.get('config').jwtSecret, function(err, decoded) {
            if (err) {
                var err = new Error('Failed to authenticate token.');
                err.status = 403;
                next(err);
            } else {
                req.decodedUser = decoded.user;
                next();
            }
        });

    } else {
        var err = new Error('No token provided.');
        err.status = 403;
        next(err);
    }
};

module.exports = jwtGuard;
