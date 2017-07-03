var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'AFP - Emulator' });
});
/* POST home page */
router.post('/', passport.authenticate('local'), function(req, res) {
    res.send({redirect: '/'});
});

module.exports = router;