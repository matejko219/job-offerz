/**
 * Created by DELL on 2017-11-03.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Company', new Schema({
    name: { type: String, unique: true, required: true },
    logo: { type: String, required: false },
}));