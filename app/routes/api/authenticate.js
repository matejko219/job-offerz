/**
 * Created by DELL on 2017-10-07.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../../models/user');

/* POST authenticate user. */
router.post('/', function(req, res, next) {
    console.log('Req: ', JSON.stringify(req.body));
    User.findOne({
        login: req.body.login
    }, function (err, user) {
        if (err) res.json({ success: false, message: err.message });

        if (!user) {
            console.log('User: ' + req.body.login + ' not found');
            var err = new Error('Authentication failed. User not found.');
            err.status = 400;
            return next(err);
        } else {
            if (user.password !== req.body.password) {
                var err = new Error('Authentication failed. Wrong password.');
                err.status = 400;
                return next(err);
            } else {
                const payload = {
                    user: {
                        id: user._id,
                        authority: user.authority
                    }
                };

                try {
                    var token = jwt.sign(payload, req.app.get('config').jwtSecret, {
                        expiresIn: '1h'
                    });

                    return res.json({
                        token: token
                    });
                } catch (err) {
                    var err = new Error('Authentication failed. JWT not generated.');
                    err.status = 400;
                    next(err);
                }

            }
        }
        
    });
});

module.exports = router;
