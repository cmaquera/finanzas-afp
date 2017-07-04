var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    name: String,
    lastname: String,
    date: Date,
    username : String,
    email: String, 
    password : String,
    sex: String,
    pension: {type: Number, dedault: null},
    fondo_acumulado: {type: Number, dedault: null}
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);