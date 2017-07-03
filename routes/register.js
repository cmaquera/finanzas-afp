var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    //if user is looged in, req.isAuthenticated() will return true
    res.redirect('/');
  } else{
    res.render('register', { title: 'AFP - Emulator' });
  }  
});
/* POST afp page */
router.post('/', function(req, res, next) {
  var user = new Account({
    name: req.body.name,
    lastname: req.body.lastname,
    date: req.body.date,
    username : req.body.username,
    email: req.body.email, 
    password : req.body.password,
    sex: req.body.sex
    
  });
  Account.register(user, req.body.password, function(err, account) {
        console.log('User authenticate');
        if (err) {
            return res.render('register', { account : account });
        }
        passport.authenticate('local')(req, res, function () {
            res.send({ redirect: '/' });
        });
    });
});

module.exports = router;