/**
 * Created by DELL on 2017-11-19.
 */
const Company = require('../models/company');
const Offer = require('../models/offer');
const handleError = require('../middlewares/error-handlers').handleError;

const OffersService = {

    getOffersPage: (req, res, next) => {
        const companyQuery = req.offersParams.companyQuery;
        const query = req.offersParams.query;
        const options = req.offersParams.options;

        Company.find(companyQuery)
            .then(companies => {
                const _ids = companies.map(company => company._id);
                query['company'] = {"$in": _ids};
                return Offer.paginate(query, options);

            }).then(offers => {
                res.json(offers);

            }).catch((err) => {
                console.log(err.stack);
                handleError('Błąd podczas pobierania ofert.', 500, next);
            });
    }
};

module.exports = OffersService;
