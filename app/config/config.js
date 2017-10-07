/**
 * Created by DELL on 2017-10-07.
 */
var environments = {
    development: {
        dbUrl: 'mongodb://localhost:27017/project-ai'
    },
    production: {
        dbUrl: 'mongodb://localhost:27017/project-ai'
    }
};

var env = environments[process.env.NODE_ENV || 'development'];
env.jwtSecret = 'przaiprojectsecret';

module.exports = env;
