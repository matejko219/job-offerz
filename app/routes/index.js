const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Aplikacje Internetowe API' });
});

// Set REST API routes
router.use('/api', require('./api'));

module.exports = router;
