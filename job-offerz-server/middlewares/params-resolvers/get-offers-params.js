/**
 * Created by DELL on 2017-11-19.
 */
const getOffersParams = (req, res, next) => {
    const offersParams = {
        query: getOffersQuery(req),
        companyQuery: getCompanyQuery(req),
        options: getOffersQueryOptions(req)
    };

    req.offersParams = offersParams;
    next();
};

const getOffersQuery = (req) => {
    const query = {};

    if (req.decodedUser && req.decodedUser._id) query['user'] = req.decodedUser._id;

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

    return query;
};

const getCompanyQuery = (req) => {
    const companyQuery = {};

    let company = req.query.company;
    if (company && company !== '') {
        company = company.replace(/\\/g, '');
        companyQuery['name'] = new RegExp(company, 'i');
    }

    return companyQuery;
};

const getOffersQueryOptions = (req) => {
    const sortField = req.query.sortField || 'createDate';
    let sortDir = +req.query.sortDir;
    if (!sortDir || (sortDir !== 1 && sortDir !== -1)) sortDir = -1;

    const options = {
        sort: {[sortField]: sortDir},
        populate: ['category', 'company'],
        lean: true,
        page: +req.query.page || 1,
        limit: +req.query.limit || 5
    };

    return options;
};

module.exports = getOffersParams;