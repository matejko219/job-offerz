/**
 * Created by DELL on 2017-10-11.
 */
var bCrypt = require('bcrypt-nodejs');

BCryptService = {
    generateHash: function (text) {
        var salt = bCrypt.genSaltSync(8);
        return bCrypt.hashSync(text, salt, null);
    },
    compareHash: function (text, hash) {
        return bCrypt.compareSync(text, hash);
    }
}

module.exports = BCryptService;
