/**
 * Created by DELL on 2017-11-19.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    offer: { type: Schema.Types.ObjectId, ref: 'Offer', required: true }
});

schema.index({user: 1, offer: 1}, {unique: true});

module.exports = mongoose.model('FavoriteOffer', schema);
