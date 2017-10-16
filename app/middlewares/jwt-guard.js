/**
 * Created by DELL on 2017-10-07.
 */
const jwt = require('jsonwebtoken');
const handleError = require('./error-handlers').handleError;
const JwtService = require('../services/jwt-service');
const GrantedToken = require('../models/granted-token');

const jwtGuard = (req, res, next) => {

    const token = req.headers['authorization'];

    if (token) {
        JwtService.verifyToken(token, (err, decoded) => {
            if (err) {
                console.log('JWT not verified: ' + err.message);
                return handleError('Failed to authenticate token.', 401, next);
            } else {
                GrantedToken.findOne({token: token.substring(7, token.length)}, (err, grantedToken) => {
                    if (err) {
                        return handleError('Error while looking for registered token in db.', 401, next);
                    }

                    if (!grantedToken) {
                        return handleError('JWT not registered in db.', 401, next);
                    }

                    const user = decoded.user;
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
