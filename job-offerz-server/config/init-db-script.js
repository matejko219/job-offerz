/**
 * Created by DELL on 2017-10-07.
 */
const User = require('../models/user');
const BCryptService = require('../services/bcrypt-service');
const AuthoritiesConsts = require('../models/utils/authorities-consts');

function initDbScript() {
    User.findOne({login: 'admin', authority: AuthoritiesConsts.ROLE_ADMIN}, (err, user) =>{
        if (err) throw err;

        if (!user) {
            const hash = BCryptService.generateHash("admin");

            const admin = new User({
                login: 'admin',
                password: hash,
                email: 'admin@test.pl',
                authority: AuthoritiesConsts.ROLE_ADMIN
            });

            admin.save(err =>{
                if (err) throw err;
                console.log('Admin added');
            });
        } else {
            console.log('Admin exist: ', JSON.stringify(user))
        }
    });
}

module.exports = initDbScript;
