/**
 * Created by DELL on 2017-10-07.
 */
var jwt = require('jsonwebtoken');
var handleError = require('./error-handlers').handleError;
var JwtService = require('../services/jwt-service');
var GrantedToken = require('../models/granted-token');

var jwtGuard = function(req, res, next) {

    var token = req.headers['authorization'];

    if (token) {
        JwtService.verifyToken(token, function(err, decoded) {
            if (err) {
                console.log('JWT not verified: ' + err.message);
                return handleError('Failed to authenticate token.', 401, next);
            } else {
                GrantedToken.findOne({token: token.substring(7, token.length)}, function (err, grantedToken) {
                    if (err) {
                        return handleError('Error while looking for registered token in db.', 401, next);
                    }

                    if (!grantedToken) {
                        return handleError('JWT not registered in db.', 401, next);
                    }

                    var user = decoded.user;
                    if (grantedToken.user_id != user.id) {
                        return handleError('Token registered already for another user.', 401, next);
                    }

                    req.decodedUser = user;
                    next();
                });
            }
        });
    } else {
        return handleError('No token provided.', 401, next);
    }
};

module.exports = jwtGuard;
