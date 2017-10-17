const express = require('express');
const router = express.Router();
const path = require('path');

// Set REST API routes
router.use('/api', require('./api'));

/* GET redirect requests to Angular app. */
router.get('*', (req, res, next) => {
    // res.render('index', { title: 'Aplikacje Internetowe API' });
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

module.exports = router;
