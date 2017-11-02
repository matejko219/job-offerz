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
                return handleError('Błąd podczas weryfikacji tokenu.', 401, next);
            } else {
                GrantedToken.findOne({token: token.substring(7, token.length)}, (err, grantedToken) => {
                    if (err) {
                        return handleError('Błąd podczas autentykacji tokenu.', 401, next);
                    }

                    if (!grantedToken) {
                        return handleError('Token nie zarejestrowany w systemie.', 401, next);
                    }

                    const user = decoded.user;
                    if (grantedToken.user != user._id) {
                        return handleError('Token zarejestrowany na innego użytkownika.', 401, next);
                    }

                    req.decodedUser = user;
                    next();
                });
            }
        });
    } else {
        return handleError('Rządanie nie zawiera tokenu.', 401, next);
    }
};

module.exports = jwtGuard;
