var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET logout page. */
router.get('/', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;