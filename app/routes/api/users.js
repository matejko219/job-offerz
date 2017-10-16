const express = require('express');
const router = express.Router();

/* GET /api/users listing. */
router.get('/', (req, res, next) => {
  res.json(req.decodedUser);
});

module.exports = router;
