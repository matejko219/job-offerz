/**
 * Created by DELL on 2017-10-07.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AuthoritiesConsts = require('./utils/authorities-consts');

module.exports = mongoose.model('User', new Schema({
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    authority: { type: String, default: AuthoritiesConsts.ROLE_USER },
    createDate: { type: Date, default: Date.now }
}));