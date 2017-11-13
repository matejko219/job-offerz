/**
 * Created by DELL on 2017-11-13.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Offer', new Schema({
    position: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    location: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    offerDetails: {
        description: { type: String, required: true },
        requirements: [{
            name: { type: String, required: true },
            rate: { type: Number, required: true },
        }],
        terms: {
            formOfEmployment: { type: String, required: true },
            jobTime: { type: Number, required: true },
            salary: {
                amount: { type: Number, required: true },
                currency: { type: String, required: true },
                type: { type: String, required: true },
                period: { type: String, required: true }
            }
        },
        bonuses: [{
            description: { type: String, required: true },
        }],
        contactDetails: {
            phone: { type: String, required: true },
            email: { type: String, required: true },
            www: { type: String },
        }
    },
    createDate: { type: Date, default: Date.now }
}));