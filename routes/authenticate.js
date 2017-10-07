/**
 * Created by DELL on 2017-10-07.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

/* POST authenticate user. */
router.post('/', function(req, res, next) {
    console.log('Req: ', JSON.stringify(req.body));
    User.findOne({
        login: req.body.login
    }, function (err, user) {
        if (err) res.json({ success: false, message: err.message });

        if (!user) {
            console.log('User: ' + req.body.login + ' not found');
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            if (user.password !== req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
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

                    res.json({
                        success: true,
                        message: 'Authentication succes!',
                        token: token
                    });
                } catch (err) {
                    console.log(err.stack);
                    res.json({ success: false, message: 'Authentication failed.' });
                }

            }
        }
        
    });
});

module.exports = router;
