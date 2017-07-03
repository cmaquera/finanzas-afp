var express = require('express');
var router = express.Router();

/* GET afp page */
router.get('/', function(req, res, next) {
  res.render('afp', { title: 'AFP - Emulator' });
});
/* POST afp page */
router.post('/', function(req, res, next) {
  res.send(req.body);
});

module.exports = router;
