/**
 * Created by DELL on 2017-10-07.
 */
var environments = {
    development: {
    },
    production: {
    }
};
var env = process.env.NODE_ENV || 'development';
module.exports = environments[env];
