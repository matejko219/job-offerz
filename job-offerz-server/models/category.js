/**
 * Created by DELL on 2017-11-13.
 */
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    active: { type: Boolean, required: true, default: true }
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Category', schema);