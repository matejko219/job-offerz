var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aplikacje Internetowe API' });
});

// Set REST API routes
router.use('/api/authenticate', require('./api/authenticate'));
router.use('/api', require('./api/index'));

module.exports = router;
