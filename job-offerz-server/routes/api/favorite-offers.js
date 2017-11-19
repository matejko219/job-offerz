/**
 * Created by DELL on 2017-11-19.
 */
const express = require('express');
const router = express.Router();
const handleError = require('../../middlewares/error-handlers').handleError;
const FavoriteOffer = require('../../models/favorite-offer');
const jwtGuard = require('../../middlewares/jwt-guard');
const getOffersParams = require('../../middlewares/params-resolvers/get-offers-params');
const requiredParams = require('../../middlewares/params-resolvers/required-params');
const OffersService = require('../../services/offers-service');

/**
 * GET /api/favorite-offers/:_id
 * @param _id dokumentu Offer
 * @return true jeśli dokument znajduje się w ulubionych, false jeśli nie
 */
router.get('/:_id', jwtGuard, requiredParams(['params._id']), (req, res, next) => {
    const offerId = req.params._id;

    FavoriteOffer.findOne({user: req.decodedUser._id, offer: offerId})
        .then(favorite => {
            if (favorite) res.json(true);
            else res.json(false);
        }).catch(err => {
            handleError('Błąd podczas sprawdzania ulubionych ofert.', 500, next);
        });
});

/**
 * POST /api/favorite-offers/:_id
 * @param _id dokumentu Offer
 * @return true jeśli dodanie do ulubionych się udało
 */
router.post('/:_id', jwtGuard, requiredParams(['params._id']), (req, res, next) => {
    const favoriteOffer = {
        user: req.decodedUser._id,
        offer: req.params._id
    };

    new FavoriteOffer(favoriteOffer)
        .save()
        .then(favoriteOffer => {
            res.json(true);
        }).catch(err => {
            handleError('Błąd podczas zapisu oferty w ulubionych.', 500, next);
        });
});

/**
 * DELETE /api/favorite-offers/:_id
 * @param _id dokumentu Offer
 * @return true jeśli usunięcie z ulubionych się udało
 */
router.delete('/:_id', jwtGuard, requiredParams(['params._id']), (req, res, next) => {
    const favoriteOffer = {
        user: req.decodedUser._id,
        offer: req.params._id
    };

    FavoriteOffer.remove(favoriteOffer, (err, deletedFavorite) => {
        if (err) {
            handleError('Błąd podczas usuwania oferty z ulubionych.', 500, next);
        } else if (deletedFavorite.result.n == 0) {
            handleError('Oferta nie była zapisana w ulubionych.', 500, next);
        } else res.json(true);
    });
});

/**
 * GET /api/favorite-offers
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
router.get('/', jwtGuard, getOffersParams, (req, res, next) => {
    FavoriteOffer.find({user: req.decodedUser._id})
        .then(favorites => {
            delete req.offersParams.query.user;
            const offerIds = favorites.map(favorite => favorite.offer);
            req.offersParams.query['_id'] = {"$in": offerIds};
            next();
        }).catch(err => {
            handleError('Błąd podczas pobierania ulubionych ofert.', 500, next);
    });
}, OffersService.getOffersPage);

module.exports = router;
