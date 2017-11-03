const express = require('express');
const router = express.Router();
const handleError = require('../../middlewares/error-handlers').handleError;
const Company = require('../../models/company');

/* POST /api/companies add new company. */
router.post('/', (req, res, next) => {
    const name = req.body.name;
    if (!name || name === '') {
        return handleError('Parametr name jest wymagany.', 400, next);
    }

    Company.findOne({name: name}, (err, company) => {
        if (err) {
          return handleError('Błąd podczas dodawania firmy.', 500, next);
        }

        if (company) {
          return handleError('Firma o podanej nazwie już istnieje.', 500, next);
        } else {

            new Company({
                name: req.body.name,
                logo: req.body.logo
            }).save((err, company) =>{
                if (err) {
                    return handleError('Błąd podczas zapisu firmy.', 500, next);
                }

                return res.json(company);
            });
        }
    });
});

/* GET /api/companies list of companies. */
router.get('/', (req, res, next) => {
  Company.find({}, (err, companies) => {
      if (err) {
          return handleError('Błąd podczas pobierania listy firm.', 500, next);
      } else {
        return res.json(companies);
      }
  })
});

module.exports = router;
