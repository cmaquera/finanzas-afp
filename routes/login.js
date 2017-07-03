var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {  
  if(req.isAuthenticated()){
    //if user is looged in, req.isAuthenticated() will return true
    res.redirect('/');
  } else{
    res.render('login', { title: 'AFP - Emulator' });
  }
});
/* POST login page */
router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
    	return res.send({ error: 'error de servidor : ' + err.message }); 
    }
    if (!user) { 
    	return res.send({ error: 'El usuario ingresado no existe' }); 
    }
    req.logIn(user, function(err) {
      if (err) { 
      	return res.send({ error: 'error de en el login' }); ; 
      }
      return res.send({ redirect: '/' });
    });
  })(req, res, next);
});

module.exports = router;