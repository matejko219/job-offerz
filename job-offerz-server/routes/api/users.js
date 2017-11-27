const express = require('express');
const router = express.Router();
const jwtGuard = require('../../middlewares/jwt-guard');
const adminGuard = require('../../middlewares/admin-guard');
const getBasicPageParams = require('../../middlewares/params-resolvers/basic-page-params');
const User = require('../../models/user');

/**
 *  GET /api/users
 *  @return użytkownik zarejestrowany w tokenie
 *  */
router.get('/', jwtGuard, (req, res, next) => {
  res.json(req.decodedUser);
});

/**
 * GET /api/users/page
 * @param filter - wartość po której filtrować użytkowników
 * @param page - numer strony zaczynając od 1. Domyślnie 1.
 * @param limit - ile elementów na stronie. Domyślnie 5.
 * @param sortField - pole po którym na nastąpić sortowanie. Domyślnie 'login'.
 * @param sortDir - porządek sortowania. Domyślnie 1 czyli rosnący.
 * @return strona dokumentów kolekcji User
 */
router.get('/page', jwtGuard, adminGuard, getBasicPageParams('login'), (req, res, next) => {

    const query = {};

    const filter = req.basicPageParams.filter;
    if (filter) {
        query['$or'] = [{login: filter}, {email: filter}, {authority: filter}];
    }

    const options = {
        sort: req.basicPageParams.sort,
        lean: true,
        page: req.basicPageParams.page,
        limit: req.basicPageParams.limit,
    };

    User.paginate(query, options)
        .then(users => {
            res.json(users);
        }).catch(err => {
        console.log(err.stack);
        handleError('Błąd podczas pobierania użytkowników.', 500, next);
    });
});

module.exports = router;
