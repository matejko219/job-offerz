/**
 * Created by DELL on 2017-10-07.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    login: String,
    password: String,
    authority: String
}));