/**
 * Created by DELL on 2017-10-07.
 */
const environments = {
    development: {
        dbUrl: 'mongodb://localhost:27017/project-ai'
    },
    production: {
        dbUrl: 'mongodb://jobofferzadm:aiprzpasswd@ds227035.mlab.com:27035/job-offerz'
    }
};

const env = environments[process.env.NODE_ENV || 'development'];
env.jwtSecret = 'przaiprojectsecret';

module.exports = env;
