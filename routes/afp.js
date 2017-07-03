var express = require('express');
var router = express.Router();
var Account = require('../models/account');

/* GET afp page */
router.get('/', function(req, res, next) {
  res.render('afp', { title: 'AFP - Emulator' });
});
/* POST afp page */
router.post('/', function(req, res, next) {
  var data = req.body;
  var user = req.user;
  
  
  /*Account.findOne({ username: req.user.username }, function(err, account) {
    //account.username.should.eql( req.user.username);
    console.log("find username: ", account.username);
    //done();
  });*/
});

module.exports = router;
	