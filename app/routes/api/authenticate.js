/**
 * Created by DELL on 2017-10-07.
 */
var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var GrantedToken = require('../../models/granted-token');
var JwtService = require('../../services/jwt-service');
var handleError = require('../../middlewares/error-handlers').handleError;
var BCryptService = require('../../services/bcrypt-service');

/* POST authenticate user. */
router.post('/', function(req, res, next) {
    var login = req.body.login;
    if (!login || login === '') {
        return handleError('login property is required.', 400, next);
    }

    var password = req.body.password;
    if (!password || password === '') {
        return handleError('password property is required.', 400, next);
    }

    User.findOne({
        login: login
    }, function (err, user) {
        if (err) {
            return handleError('Authentication failed. DB error - User.', 500, next);
        }

        if (!user) {
            console.log('User: ' + login + ' not found');
            return handleError('Authentication failed. User not found.', 400, next);
        } else {
            if (!BCryptService.compareHash(password, user.password)) {
                return handleError('Authentication failed. Wrong password.', 400, next);
            } else {
                var generatedToken;
                try {
                    generatedToken = JwtService.generateToken(user);
                } catch (err) {
                    return handleError('Authentication failed. JWT not generated.', 500, next);
                }

                GrantedToken.remove({user_id: user._id}, function (err, deletedTokens) {
                    if (err) {
                        return handleError('Authentication failed. DB error.', 500, next);
                    }

                    console.log('Removed ' + deletedTokens.result.n +' previously granted tokens');

                    new GrantedToken({
                        user_id: user._id,
                        token: generatedToken
                    }).save(function (err, grantedToken) {
                        if (err) {
                            return handleError('Authentication failed. DB error - GT not saved.', 500, next);
                        }
                        console.log('New granted token saved in db.');

                        return res.json({
                            token: generatedToken
                        });
                    });
                });
            }
        }
    });
});

module.exports = router;
