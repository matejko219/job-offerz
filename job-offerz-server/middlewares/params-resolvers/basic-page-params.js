/**
 * Created by DELL on 2017-11-27.
 */
const getBasicPageParams = (defaultSortField) => {
    return (req, res, next) => {

        const sortField = req.query.sortField || defaultSortField || '_id';
        let sortDir = +req.query.sortDir;
        if (!sortDir || (sortDir !== 1 && sortDir !== -1)) sortDir = 1;

        const basicPageParams = {
            sort: {[sortField]: sortDir},
            page: +req.query.page || 1,
            limit: +req.query.limit || 5
        };

        let filter = req.query.filter;
        if (filter && filter !== '') {
            filter = filter.replace(/\\/g, '');
            basicPageParams['filter'] = new RegExp(filter, 'i');
        }

        req.basicPageParams = basicPageParams;
        next();
    };
};

module.exports = getBasicPageParams;
