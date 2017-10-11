var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aplikacje Internetowe API' });
});

// Set REST API routes
//unprotected ones
router.use('/api/authenticate', require('./api/authenticate'));
router.use('/api/signup', require('./api/signup'));
//protected ones
router.use('/api', require('./api/index'));

module.exports = router;
