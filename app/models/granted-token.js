/**
 * Created by DELL on 2017-10-09.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('GrantedToken', new Schema({
    user_id: { type: Schema.Types.ObjectId, unique: true, required: true },
    token: { type: String, unique: true, required: true },
    date: { type: Date, default: Date.now }
}));