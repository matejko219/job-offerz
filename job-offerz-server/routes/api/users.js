const express = require('express');
const router = express.Router();
const jwtGuard = require('../../middlewares/jwt-guard');

/* GET /api/users listing. */
router.get('/', jwtGuard, (req, res, next) => {
  res.json(req.decodedUser);
});

module.exports = router;
