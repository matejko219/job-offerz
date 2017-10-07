/**
 * Created by DELL on 2017-10-07.
 */
var express = require('express');
var router = express.Router();
var jwtGuard = require('../../middlewares/jwt-guard');

// Set REST API routes
router.use(jwtGuard);
router.use('/users', require('./users'));

module.exports = router;
