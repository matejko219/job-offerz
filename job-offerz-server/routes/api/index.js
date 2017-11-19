/**
 * Created by DELL on 2017-10-07.
 */
const express = require('express');
const router = express.Router();

// Set REST API routes
router.use('/', require('./security'));
router.use('/users', require('./users'));
router.use('/companies', require('./companies'));
router.use('/categories', require('./categories'));
router.use('/offers', require('./offers'));
router.use('/favorite-offers', require('./favorite-offers'));

module.exports = router;
