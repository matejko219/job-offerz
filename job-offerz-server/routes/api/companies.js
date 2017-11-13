const express = require('express');
const router = express.Router();
const handleError = require('../../middlewares/error-handlers').handleError;
const Company = require('../../models/company');

/**
 * POST /api/companies
 * @param obiekt klasy Company
 * @return dokument kolekcji Company utworzony po operacji zapisu
 */
router.post('/', (req, res, next) => {
    const newCompany = req.body;
    const name = newCompany.name;
    if (!name || name === '') {
        return handleError('Parametr name jest wymagany.', 400, next);
    }

    if (name.includes('\\')) {
        return handleError('Nazwa nie może zawierać znaku "\\".', 400, next);
    }

    const logo = req.body.logo;
    if (!logo || logo === '') {
        return handleError('Parametr logo jest wymagany.', 400, next);
    }

    Company.findOne({name: name}, (err, company) => {
        if (err) {
          return handleError('Błąd podczas dodawania firmy.', 500, next);
        }

        if (company) {
          return handleError('Firma o podanej nazwie już istnieje.', 500, next);
        } else {

            new Company(newCompany).save((err, company) =>{
                if (err) {
                    return handleError('Błąd podczas zapisu firmy.', 500, next);
                }

                return res.json(company);
            });
        }
    });
});

/**
 * GET /api/companies?name=
 * @param name  znaki zawierające się w nazwie dokumentu kolekcji Company. Parametr opcjonalny
 * @return lista dokumentów kolekcji Company pasujących do zapytania z parametrem name
 */
router.get('/', (req, res, next) => {
    let name = req.query.name;

    if (name) name = name.replace(/\\/g, '');

    const query = name ? {name: new RegExp(name, 'i')} : {};

    Company.find(query, (err, companies) => {
        if (err) {
            return handleError('Błąd podczas pobierania listy firm.', 500, next);
        } else {
            return res.json(companies);
        }
    });
});

module.exports = router;
