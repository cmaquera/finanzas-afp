var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log( 'USER: ' + req.user);
  res.render('index', { title: 'AFP - Emulator', user: req.user });
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
