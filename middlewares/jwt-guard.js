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
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decodedUser = decoded.user;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};

module.exports = jwtGuard;
