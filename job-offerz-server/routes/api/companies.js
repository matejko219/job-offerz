const express = require('express');
const router = express.Router();
const handleError = require('../../middlewares/error-handlers').handleError;
const Company = require('../../models/company');
const jwtGuard = require('../../middlewares/jwt-guard');
const requiredParams = require('../../middlewares/params-resolvers/required-params');

/**
 * POST /api/companies
 * @param obiekt klasy Company
 * @return dokument kolekcji Company utworzony po operacji zapisu
 */
router.post('/', jwtGuard, requiredParams(['body.name', 'body.logo']), (req, res, next) => {
    const newCompany = req.body;
    const name = newCompany.name;

    if (name.includes('\\')) {
        return handleError('Nazwa nie może zawierać znaku "\\".', 400, next);
    }

    Company.findOne({name: name}, (err, company) => {
        if (err) {
          return handleError('Błąd podczas dodawania firmy.', 500, next);
        }

        if (company) {
          handleError('Firma o podanej nazwie już istnieje.', 500, next);
        } else {

            new Company(newCompany).save((err, company) =>{
                if (err) {
                    handleError('Błąd podczas zapisu firmy.', 500, next);
                } else res.json(company);
            });
        }
    });
});

/**
 * GET /api/companies?name=
 * @param name  znaki zawierające się w nazwie dokumentu kolekcji Company. Parametr opcjonalny
 * @return lista dokumentów kolekcji Company pasujących do zapytania z parametrem name
 */
router.get('/', jwtGuard, (req, res, next) => {
    let name = req.query.name;

    if (name !== null) name = name.replace(/\\/g, '');

    const query = name !== null ? {name: new RegExp(name, 'i')} : {};

    Company.find(query, (err, companies) => {
        if (err) {
            handleError('Błąd podczas pobierania listy firm.', 500, next);
        } else {
            res.json(companies);
        }
    });
});

module.exports = router;
