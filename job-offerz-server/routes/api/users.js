const express = require('express');
const router = express.Router();
const jwtGuard = require('../../middlewares/jwt-guard');
const adminGuard = require('../../middlewares/admin-guard');
const getBasicPageParams = require('../../middlewares/params-resolvers/basic-page-params');
const User = require('../../models/user');
const requiredParams = require('../../middlewares/params-resolvers/required-params');
const BCryptService = require('../../services/bcrypt-service');
const AuthoritiesConsts = require('../../models/utils/authorities-consts');
const handleError = require('../../middlewares/error-handlers').handleError;

/**
 * PUT /api/users
 * @param obiekt klasy User
 * @return dokument kolekcji User po aktualizacji
 */
router.put('/', jwtGuard, requiredParams(['body.login', 'body.email']), (req, res, next) => {
    const updatedUser = req.body;
    const decodedUser = req.decodedUser;

    console.log('updatedUser', updatedUser);

    User.find({$or: [{login: updatedUser.login}, {email: updatedUser.email}]}, (err, users) => {
        if (err) return handleError('Błąd podczas aktualizacji użytkownika', 500, next);

        users.forEach(user => {
            if (user.login === updatedUser.login && user._id != updatedUser._id) {
                return handleError('Użytkownik z loginem: ' + updatedUser.login + ' już istnieje.', 400, next);
            }

            if (user.email === updatedUser.email && user._id != updatedUser._id) {
                return handleError('Użytkownik z adresem email: ' + updatedUser.email + ' już istnieje.', 400, next);
            }
        });

        if (decodedUser.authority !== AuthoritiesConsts.ROLE_ADMIN) {
            delete updatedUser.authority;
            delete updatedUser.active;
        }

        if (decodedUser.authority !== AuthoritiesConsts.ROLE_ADMIN && decodedUser._id !== updatedUser._id) {
            return handleError('Brak uprawnień do edycji użytkownika.', 403, next);
        } else {

            User.findById(updatedUser._id, (err, user) => {
                if (err) return handleError('Nie znaleziono użytkownika o podanym _id', 500, next);
                else {
                    if (updatedUser.password && updatedUser.password != '') {
                        updatedUser.password = BCryptService.generateHash(updatedUser.password);
                    } else delete updatedUser.password;

                    user.set(updatedUser)
                        .save()
                        .then(user => {
                            user.password = null;
                            res.json(user);
                        }).catch((err) => {
                        console.log(err.stack);
                        handleError('Błąd podczas aktualizacji użytkownika.', 500, next);
                    });
                }
            });
        }
    });
});

/**
 * DELETE /api/users/:_id
 * @param _id dokumentu User
 * @return true jeśli usunięcie się udało
 */
router.delete('/:_id', jwtGuard, adminGuard, requiredParams(['params._id']), (req, res, next) => {
    const userToDelete = {
        _id: req.params._id
    };

    User.remove(userToDelete, (err, deletedUser) => {
        if (err) {
            handleError('Błąd podczas usuwania użytkownika.', 500, next);

        } else if (deletedUser.result.n == 0) {
            handleError('Użytkownik nie został usunięty.', 500, next);

        } else res.json(true);
    });
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
        select: '-password',
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
