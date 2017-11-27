/**
 * Created by DELL on 2017-10-07.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const AuthoritiesConsts = require('./utils/authorities-consts');

const schema = new Schema({
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    authority: { type: String, default: AuthoritiesConsts.ROLE_USER },
    createDate: { type: Date, default: Date.now },
    active: { type: Boolean, required: true, default: true }
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', schema);