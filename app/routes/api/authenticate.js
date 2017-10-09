/**
 * Created by DELL on 2017-10-07.
 */
var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var GrantedToken = require('../../models/granted-token');
var JwtService = require('../../services/jwt-service');
var handleError = require('../../middlewares/error-handlers').handleError;

/* POST authenticate user. */
router.post('/', function(req, res, next) {
    User.findOne({
        login: req.body.login
    }, function (err, user) {
        if (err) {
            return handleError('Authentication failed. DB error - User.', 500, next);
        }

        if (!user) {
            console.log('User: ' + req.body.login + ' not found');
            return handleError('Authentication failed. User not found.', 400, next);
        } else {
            if (user.password !== req.body.password) {
                return handleError('Authentication failed. Wrong password.', 400, next);
            } else {

                var generatedToken;
                try {
                    generatedToken = JwtService.generateToken(user);
                } catch (err) {
                    return handleError('Authentication failed. JWT not generated.', 500, next);
                }

                GrantedToken.findOne({user_id: user._id}, function (err, grantedToken) {
                    if (err) {
                        return handleError('Authentication failed. DB error.', 500, next);
                    }

                    if (grantedToken) {
                        grantedToken.token = generatedToken;
                        grantedToken.date = Date.now();
                        grantedToken.save(function (err, updatedToken) {
                            if (err) {
                                return handleError('Authentication failed. DB error - UT not saved.', 500, next);
                            }
                            console.log('Already granted token updated in db.')
                        })
                    } else {
                        new GrantedToken({
                            user_id: user._id,
                            token: generatedToken
                        }).save(function (err, newGrantedToken) {
                            if (err) {
                                return handleError('Authentication failed. DB error - GT not saved.', 500, next);
                            }
                            console.log('New granted token saved in db.')
                        });
                    }
                });

                return res.json({
                    token: generatedToken
                });

            }
        }
        
    });
});

module.exports = router;
