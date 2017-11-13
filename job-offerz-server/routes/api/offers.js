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

module.exports = router;
