/**
 * Created by DELL on 2017-10-11.
 */
var express = require('express');
var router = express.Router();
var handleError = require('../../middlewares/error-handlers').handleError;
var User = require('../../models/user');
var BCryptService = require('../../services/bcrypt-service');

/* POST signup new user. */
router.post('/', function(req, res, next) {
    var login = req.body.login;
    if (!login || login === '') {
        return handleError('login property is required.', 400, next);
    }

    var password = req.body.password;
    if (!password || password === '') {
        return handleError('password property is required.', 400, next);
    }

    User.findOne({login: login}, function (err, user) {
        if (err) return handleError('Error while signup new user', 500, next);

        if (user) {
            return handleError('User with login: ' + login + ' already exist.', 400, next);
        } else {
            var hash = BCryptService.generateHash(password);

            new User({
                login: login,
                password: hash,
                authority: 'ROLE_USER'
            }).save(function (err) {
                if (err) return handleError('Error while signup new user', 500, next);
                else return res.json({
                    success: true
                });
            });
        }
    });
});

module.exports = router;