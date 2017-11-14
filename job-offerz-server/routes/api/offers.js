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
    offer.user = req.decodedUser._id;

    new Offer(offer)
        .save()
        .then(offer => {
            res.json(offer);
        }).catch((err) => {
            console.log(err.stack);
            handleError('Błąd podczas zapisu oferty.', 500, next);
        });
});

/**
 * GET /api/offers
 * @param
 * @return lista dokumentów kolekcji Offer
 */
router.get('/', (req, res, next) => {
    const query   = {};
    const options = {
        sort: { createDate: -1 },
        populate: ['category', 'company'],
        lean: true,
        page: 1,
        limit: 10
    };

    Offer.paginate(query, options)
        .then(offers => {
            res.json(offers);
        }).catch((err) => {
            handleError('Błąd podczas pobierania ofert.', 500, next);
        });
});

module.exports = router;
