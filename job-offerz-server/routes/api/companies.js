const express = require('express');
const router = express.Router();
const handleError = require('../../middlewares/error-handlers').handleError;
const Company = require('../../models/company');
const jwtGuard = require('../../middlewares/jwt-guard');
const adminGuard = require('../../middlewares/admin-guard');
const requiredParams = require('../../middlewares/params-resolvers/required-params');
const getBasicPageParams = require('../../middlewares/params-resolvers/basic-page-params');

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
            handleError('Firma o podanej nazwie już istnieje.', 400, next);
        } else {

            new Company(newCompany).save((err, company) => {
                if (err) {
                    handleError('Błąd podczas zapisu firmy.', 500, next);
                } else res.json(company);
            });
        }
    });
});

/**
 * PUT /api/companies
 * @param obiekt klasy Company
 * @return dokument kolekcji Company po aktualizacji
 */
router.put('/', jwtGuard, adminGuard, requiredParams(['body.name', 'body.logo']), (req, res, next) => {
    const updatedCompany = req.body;

    Company.findOne({name: updatedCompany.name})
        .then(company => {
            if (company && company._id != updatedCompany._id) {
                handleError('Firma o podanej nazwie już istnieje.', 400, next);
            } else {
                Company.findOne({_id: updatedCompany._id})
                    .then(company => {
                        if (!company) handleError('Brak firmy o podanym _id.', 404, next);
                        else {
                            company.set(updatedCompany);
                            company.save()
                                .then(company => {
                                    res.json(company);
                                }).catch((err) => {
                                console.log(err.stack);
                                handleError('Błąd podczas zapisu zmian firmy.', 500, next);
                            });
                        }
                    }).catch(err => {
                    console.log(err.stack);
                    handleError('Błąd podczas edycji firmy.', 500, next);
                });
            }
        }).catch(err => {
        console.log(err.stack);
        handleError('Błąd podczas edycji firmy.', 500, next);
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

    const query = {active: true};

    if (name !== null) {
        query['name'] = new RegExp(name, 'i');
    }

    Company.find(query, (err, companies) => {
        if (err) {
            handleError('Błąd podczas pobierania listy firm.', 500, next);
        } else {
            res.json(companies);
        }
    });
});

/**
 * GET /api/companies/page
 * @param name - nazwa po której filtrować firmy
 * @param page - numer strony zaczynając od 1. Domyślnie 1.
 * @param limit - ile elementów na stronie. Domyślnie 5.
 * @param sortField - pole po którym na nastąpić sortowanie. Domyślnie 'name'.
 * @param sortDir - porządek sortowania. Domyślnie 1 czyli rosnący.
 * @return strona dokumentów kolekcji Company
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

    Company.paginate(query, options)
        .then(categories => {
            res.json(categories);
        }).catch(err => {
        console.log(err.stack);
        handleError('Błąd podczas pobierania firm.', 500, next);
    });
});

module.exports = router;
