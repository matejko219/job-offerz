/**
 * Created by DELL on 2017-10-09.
 */
var express = require('express');
var router = express.Router();
var GrantedToken = require('../../models/granted-token');
var handleError = require('../../middlewares/error-handlers').handleError;

/* POST authenticate user. */
router.get('/', function(req, res, next) {
    GrantedToken.remove({user_id: req.decodedUser.id}, function (err) {
        if (err) handleError('Error while logout', 500, next);
        else return res.json({
            success: true
        });
    })
});

module.exports = router;
