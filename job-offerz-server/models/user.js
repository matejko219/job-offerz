/**
 * Created by DELL on 2017-10-07.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    authority: { type: String, default: 'ROLE_USER' },
    create_date: { type: Date, default: Date.now }
}));