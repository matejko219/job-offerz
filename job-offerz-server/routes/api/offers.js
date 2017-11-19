/**
 * Created by DELL on 2017-11-13.
 */
const express = require('express');
const router = express.Router();
const handleError = require('../../middlewares/error-handlers').handleError;
const Offer = require('../../models/offer');
const jwtGuard = require('../../middlewares/jwt-guard');
const getOffersParams = require('../../middlewares/params-resolvers/get-offers-params');
const requiredParams = require('../../middlewares/params-resolvers/required-params');
const OffersService = require('../../services/offers-service');

/**
 * POST /api/offers
 * @param obiekt klasy Offer
 * @return dokument kolekcji Offer utworzony po operacji zapisu
 */
router.post('/', jwtGuard, (req, res, next) => {
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
 * DELETE /api/offers/:_id
 * @param _id dokumentu Offer
 * @return true jeśli usunięcie się udało
 */
router.delete('/:_id', jwtGuard, requiredParams(['params._id']), (req, res, next) => {
    const offerToDelete = {
        _id: req.params._id,
        user: req.decodedUser._id
    };

    Offer.remove(offerToDelete, (err, deletedOffer) => {
        if (err) {
            handleError('Błąd podczas usuwania oferty.', 500, next);

        } else if (deletedOffer.result.n == 0) {
            handleError('Oferta nie została usunięta.', 500, next);

        } else res.json(true);
    });
});

/**
 * GET /api/offers
 * @param category - _id dokumentu kolekcji Category po którym ma dopsaować zwracane dane
 *                  lub -1 jeśli wszytskie.
 * @param location - nazwa miejscowości do której przypisano oferte.
 * @param position - nazwa stanowiska jakiego dotyczy oferta.
 * @param company - nazwa firmy dla której mają zostać znalezione dane.
 * @param page - numer strony zaczynając od 1. Domyślnie 1.
 * @param limit - ile elementów na stronie. Domyślnie 5.
 * @param sortField - pole po którym na nastąpić sortowanie. Domyślnie 'createDate'.
 * @param sortDir - porządek sortowania. Domyślnie -1 czyli malejący.
 * @return strona dokumentów kolekcji Offer
 */
router.get('/', getOffersParams, OffersService.getOffersPage);

/**
 * GET /api/offers/added
 * @param category - _id dokumentu kolekcji Category po którym ma dopsaować zwracane dane
 *                  lub -1 jeśli wszytskie.
 * @param location - nazwa miejscowości do której przypisano oferte.
 * @param position - nazwa stanowiska jakiego dotyczy oferta.
 * @param company - nazwa firmy dla której mają zostać znalezione dane.
 * @param page - numer strony zaczynając od 1. Domyślnie 1.
 * @param limit - ile elementów na stronie. Domyślnie 5.
 * @param sortField - pole po którym na nastąpić sortowanie. Domyślnie 'createDate'.
 * @param sortDir - porządek sortowania. Domyślnie -1 czyli malejący.
 * @return strona dokumentów kolekcji Offer dodanych przez zalogowanego użytkownika
 */
router.get('/added', jwtGuard, getOffersParams, OffersService.getOffersPage);

/**
 * GET /api/offers/:_id
 * @param _id dokumentu Offer
 * @return dokument kolekcji Offer
 */
router.get('/:_id', requiredParams(['params._id']), (req, res, next) => {
    const _id = req.params._id;

    Offer.findOne({_id: _id})
        .populate('category')
        .populate('company')
        .exec((err, offer) => {
            if (err) {
                handleError('Błąd podczas pobierania oferty.', 500, next);

            } else if (offer) {
                res.json(offer);

            } else handleError('Brak oferty o podanym _id.', 404, next);

        });
});

module.exports = router;
