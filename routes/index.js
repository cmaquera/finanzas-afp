var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var afp = require('../public/javascripts/afp');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AFP - Emulator', user: req.user });
});
router.post('/', function(req, res, next) {
  var data = req.body;
  var user = req.user;
  
  var sexo = user.sex;
  var year = user.date.toString().split(' ')[3];
  var year_now = Date().toString().split(' ')[3];
  var edad = parseInt(year_now) - parseInt(year);
  var sueldo = parseFloat(data.sueldo);
  var aporte = parseFloat(data.aporte);
  var fondo = parseInt(data.fondo);
  var edad_retiro = parseInt(data.edad_retiro);

  var tasa_mensual = afp.tasa_mensual(fondo);
  var fondo_acumulado = afp.fondo_acumulado(tasa_mensual, sueldo, aporte, edad_retiro, edad).toFixed(2);
  var pension = afp.pension(fondo_acumulado, edad_retiro, sexo).toFixed(2);

  Account.findOne({ username: req.user.username, password: req.user.password }, function(err, account) {
    account.pension = pension;
    account.fondo_acumulado = fondo_acumulado;
    account.save();

    return res.send({ fondo_acumulado: fondo_acumulado, pension: pension }); 
  });
});

module.exports = router;
