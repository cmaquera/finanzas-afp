var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'AFP - Emulator' });
});
/* POST afp page */
router.post('/', function(req, res, next) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        console.log('User authenticate');
        if (err) {
            console.log(err);
            return res.render('register', { account : account });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

module.exports = router;