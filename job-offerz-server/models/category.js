/**
 * Created by DELL on 2017-11-13.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Category', new Schema({
    name: { type: String, unique: true, required: true }
}));