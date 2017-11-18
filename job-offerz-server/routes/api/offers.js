/**
 * Created by DELL on 2017-11-13.
 */
const express = require('express');
const router = express.Router();
const handleError = require('../../middlewares/error-handlers').handleError;
const Offer = require('../../models/offer');
const Company = require('../../models/company');

/**
 * POST /api/offers
 * @param obiekt klasy Offer
 * @return dokument kolekcji Offer utworzony po operacji zapisu
 */
router.post('/', (req, res, next) => {
    const offer = req.body;
    offer.user = req.decodedUser._id;

    new Offer(offer)
        .save()
        .then(offer => {
            res.json(offer);
        }).catch((err) => {
        console.log(err.stack);
        handleError('Błąd podczas zapisu oferty.', 500, next);
    });
});

/**
 * GET /api/offers
 * @param
 * @return strona dokumentów kolekcji Offer
 */
router.get('/', (req, res, next) => {
    const query = {};
    const companyQuery = {};

    const category = req.query.category;
    if (category && category !== '-1' && category !== '') query['category'] = category;

    let location = req.query.location;
    if (location && location !== '') {
        location = location.replace(/\\/g, '');
        query['location'] = new RegExp(location, 'i');
    }

    let position = req.query.position;
    if (position && position !== '') {
        position = position.replace(/\\/g, '');
        query['position'] = new RegExp(position, 'i');
    }

    let company = req.query.company;
    if (company && company !== '') {
        company = company.replace(/\\/g, '');
        companyQuery['name'] = new RegExp(company, 'i');
    }

    const sortField = req.query.sortField || 'createDate';
    let sortDir = req.query.sortDir;
    if (!sortDir || (sortDir !== 1 && sortDir !== -1)) sortDir = -1;

    const options = {
        sort: {[sortField]: sortDir},
        populate: ['category', 'company'],
        lean: true,
        page: +req.query.page || 1,
        limit: +req.query.limit || 5
    };

    Company.find(companyQuery)
        .then(companies => {
            const _ids = companies.map(company => company._id);
            query['company'] = { "$in": _ids };
            return Offer.paginate(query, options);

        }).then(offers => {
            res.json(offers);

        }).catch((err) => {
            console.log(err.stack);
            handleError('Błąd podczas pobierania ofert.', 500, next);
        });
});

/**
 * GET /api/offers/:_id
 * @param _id dokumentu Offer
 * @return dokument kolekcji Offer
 */
router.get('/:_id', (req, res, next) => {
    const _id = req.param('_id');

    if (!_id) {
        return handleError('Parametr _id jest wymagany.', 400, next);
    }

    Offer.findOne({_id: _id})
        .populate('category')
        .populate('company')
        .exec((err, offer) => {
            if (err) {
                handleError('Błąd podczas pobierania oferty.', 500, next);

            } else if (offer) {
                res.json(offer);

            } else handleError('Brak oferty o podanym _id.', 404, next);

        });
});

module.exports = router;
