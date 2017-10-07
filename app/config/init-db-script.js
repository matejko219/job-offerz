/**
 * Created by DELL on 2017-10-07.
 */
var User = require('../models/user');

var initDbScript = function() {
    console.log('initDbScript invoke');

    User.findOne({login: 'admin', authority: 'ROLE_ADMIN'}, function (err, user) {
        if (err || !user) {
            var admin = new User({
                login: 'admin',
                password: 'admin',
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
