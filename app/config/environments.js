/**
 * Created by DELL on 2017-10-07.
 */
var environments = {
    development: {
        dbUrl: 'mongodb://localhost:27017/project-ai'
    },
    production: {
        dbUrl: 'waiting for mLab URL :)'
    }
};

var env = process.env.NODE_ENV || 'development';
module.exports = environments[env];
