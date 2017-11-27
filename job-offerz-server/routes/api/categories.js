/**
 * Created by DELL on 2017-11-13.
 */
const express = require('express');
const router = express.Router();
const handleError = require('../../middlewares/error-handlers').handleError;
const Category = require('../../models/category');
const jwtGuard = require('../../middlewares/jwt-guard');
const adminGuard = require('../../middlewares/admin-guard');
const requiredParams = require('../../middlewares/params-resolvers/required-params');
const getBasicPageParams = require('../../middlewares/params-resolvers/basic-page-params');

/**
 * POST /api/categories
 * @param obiekt klasy Category
 * @return dokument kolekcji Category utworzony po operacji zapisu
 */
router.post('/', jwtGuard, adminGuard, requiredParams(['body.name']), (req, res, next) => {
    const newCategory = req.body;
    const name = newCategory.name;

    Category.findOne({name: name}, (err, category) => {
        if (err) {
            return handleError('Błąd podczas dodawania kategorii.', 500, next);
        }

        if (category) {
            handleError('Kategoria o podanej nazwie już istnieje.', 400, next);
        } else {

            new Category(newCategory).save((err, category) =>{
                if (err) {
                    handleError('Błąd podczas zapisu kategorii.', 500, next);
                } else res.json(category);
            });
        }
    });
});

/**
 * PUT /api/categories
 * @param obiekt klasy Category
 * @return dokument kolekcji Category po aktualizacji
 */
router.put('/', jwtGuard, adminGuard, requiredParams(['body.name']), (req, res, next) => {
    const updatedCategory = req.body;

    Category.findOne({name: updatedCategory.name})
        .then(category => {
            if (category && category._id != updatedCategory._id) {
                handleError('Kategoria o podanej nazwie już istnieje.', 400, next);
            } else {
                Category.findOne({_id: updatedCategory._id})
                    .then(category => {
                        if (!category) handleError('Brak kategorii o podanym _id.', 404, next);
                        else {
                            category.set(updatedCategory);
                            category.save()
                                .then(category => {
                                    res.json(category);
                                }).catch((err) => {
                                console.log(err.stack);
                                handleError('Błąd podczas zapisu zmian kategorii.', 500, next);
                            });
                        }
                    }).catch(err => {
                    console.log(err.stack);
                    handleError('Błąd podczas edycji kategorii.', 500, next);
                });
            }
        }).catch(err => {
        console.log(err.stack);
        handleError('Błąd podczas edycji kategorii.', 500, next);
    });

});

/**
 * GET /api/categories?active=
 * @param active opcjonalny boolean czy aktywne czy nie
 * @return lista dokumentów kolekcji Category
 */
router.get('/', (req, res, next) => {
    const active = req.query.active;

    const query = (active !== null && (active === 'true' || active === 'false')) ? {active} : {};

    Category.find(query, (err, categories) => {
        if (err) {
            handleError('Błąd podczas pobierania listy kategorii.', 500, next);
        } else {
            res.json(categories);
        }
    });
});

/**
 * GET /api/categories/page
 * @param name - nazwa po której filtrować kategorie
 * @param page - numer strony zaczynając od 1. Domyślnie 1.
 * @param limit - ile elementów na stronie. Domyślnie 5.
 * @param sortField - pole po którym na nastąpić sortowanie. Domyślnie 'name'.
 * @param sortDir - porządek sortowania. Domyślnie 1 czyli rosnący.
 * @return strona dokumentów kolekcji Category
 */
router.get('/page', jwtGuard, adminGuard, getBasicPageParams('name'), (req, res, next) => {

    const query = {};

    const filter = req.basicPageParams.filter;
    if (filter) {
        query['name'] = filter;
    }

    const options = {
        sort: req.basicPageParams.sort,
        lean: true,
        page: req.basicPageParams.page,
        limit: req.basicPageParams.limit,
    };

    Category.paginate(query, options)
        .then(categories => {
            res.json(categories);
        }).catch(err => {
            console.log(err.stack);
            handleError('Błąd podczas pobierania kategorii.', 500, next);
    });
});

module.exports = router;
