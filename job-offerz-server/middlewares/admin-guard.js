/**
 * Created by DELL on 2017-11-26.
 */
const handleError = require('./error-handlers').handleError;
const AuthoritiesConsts = require('../models/utils/authorities-consts');

const adminGuard = (req, res, next) => {

    const decodedUser = req.decodedUser;

    if (decodedUser && decodedUser.authority === AuthoritiesConsts.ROLE_ADMIN) {
        next();
    } else handleError('Nie posiadasz wystarczających uprawnień.', 403, next);
};

module.exports = adminGuard;