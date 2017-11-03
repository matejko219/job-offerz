/**
 * Created by DELL on 2017-10-07.
 */
const express = require('express');
const router = express.Router();

// Set security REST API
// and set Authentication Guard (inside ./security routes)
router.use('/', require('./security'));
// Set REST API routes
router.use('/users', require('./users'));
router.use('/companies', require('./companies'));

module.exports = router;
