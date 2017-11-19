/**
 * Created by DELL on 2017-11-13.
 */
const express = require('express');
const router = express.Router();
const handleError = require('../../middlewares/error-handlers').handleError;
const Category = require('../../models/category');
const jwtGuard = require('../../middlewares/jwt-guard');

/**
 * POST /api/categories
 * @param obiekt klasy Category
 * @return dokument kolekcji Category utworzony po operacji zapisu
 */
router.post('/', jwtGuard, (req, res, next) => {
    const newCategory = req.body;
    const name = newCategory.name;
    if (!name || name === '') {
        return handleError('Parametr name jest wymagany.', 400, next);
    }

    Category.findOne({name: name}, (err, category) => {
        if (err) {
            return handleError('Błąd podczas dodawania kategorii.', 500, next);
        }

        if (category) {
            handleError('Kategoria o podanej nazwie już istnieje.', 500, next);
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
 * GET /api/categories
 * @return lista dokumentów kolekcji Category
 */
router.get('/', (req, res, next) => {
    Category.find({}, (err, categories) => {
        if (err) {
            handleError('Błąd podczas pobierania listy kategorii.', 500, next);
        } else {
            res.json(categories);
        }
    });
});

module.exports = router;
