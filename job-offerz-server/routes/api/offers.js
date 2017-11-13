/**
 * Created by DELL on 2017-11-13.
 */
const express = require('express');
const router = express.Router();
const handleError = require('../../middlewares/error-handlers').handleError;
const Offer = require('../../models/offer');

/**
 * POST /api/offers
 * @param obiekt klasy Offer
 * @return dokument kolekcji Offer utworzony po operacji zapisu
 */
router.post('/', (req, res, next) => {
    const offer = req.body;

    new Offer(offer).save((err, offer) => {
        if (err) {
            console.log(err.stack);
            return handleError('Błąd podczas zapisu oferty.', 500, next);
        }

        return res.json(offer);
    });
});

/**
 * GET /api/offers
 * @param
 * @return lista dokumentów kolekcji Offer
 */
router.get('/', (req, res, next) => {
    Offer.find({})
        .populate('category')
        .populate('company')
        .exec((err, offers) => {
            if (err) {
                return handleError('Błąd podczas pobierania listy ofert.', 500, next);
            } else {
                return res.json(offers);
            }
        });
});

module.exports = router;
