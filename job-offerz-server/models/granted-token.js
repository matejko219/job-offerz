/**
 * Created by DELL on 2017-10-09.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('GrantedToken', new Schema({
    user_id: { type: Schema.Types.ObjectId, unique: true, required: true },
    token: { type: String, unique: true, required: true },
    createDate: { type: Date, default: Date.now }
}));