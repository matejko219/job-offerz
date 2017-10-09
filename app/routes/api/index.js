/**
 * Created by DELL on 2017-10-07.
 */
var express = require('express');
var router = express.Router();
var jwtGuard = require('../../middlewares/jwt-guard');

// Set Authentication Guard
router.use(jwtGuard);
// Set REST API routes
router.use('/logout', require('./logout'));
router.use('/users', require('./users'));

module.exports = router;
