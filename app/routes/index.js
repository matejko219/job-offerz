var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Set REST API routes
router.use('/api/authenticate', require('./authenticate'));
router.use('/api', require('./api/index'));

module.exports = router;
