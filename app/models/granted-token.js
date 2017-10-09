/**
 * Created by DELL on 2017-10-09.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('GrantedToken', new Schema({
    user_id: Schema.Types.ObjectId,
    token: String,
    date: { type: Date, default: Date.now }
}));