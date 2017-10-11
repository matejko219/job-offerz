/**
 * Created by DELL on 2017-10-07.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    authority: { type: String, default: 'ROLE_USER' }
}));