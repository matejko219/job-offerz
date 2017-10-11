/**
 * Created by DELL on 2017-10-07.
 */
var User = require('../models/user');
var BCryptService = require('../services/bcrypt-service');

var initDbScript = function() {
    console.log('initDbScript invoke');

    User.findOne({login: 'admin', authority: 'ROLE_ADMIN'}, function (err, user) {
        if (err) throw err;

        if (!user) {
            var hash = BCryptService.generateHash("admin");

            var admin = new User({
                login: 'admin',
                password: hash,
                authority: 'ROLE_ADMIN'
            });

            admin.save(function (err) {
                if (err) throw err;
                console.log('Admin added');
            });
        } else {
            console.log('Admin exist: ', JSON.stringify(user))
        }
    });
};

module.exports = initDbScript;
