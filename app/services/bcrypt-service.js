/**
 * Created by DELL on 2017-10-11.
 */
const bCrypt = require('bcrypt-nodejs');

const BCryptService = {
    generateHash: (text) => {
        const salt = bCrypt.genSaltSync(8);
        return bCrypt.hashSync(text, salt, null);
    },
    compareHash: (text, hash) => {
        return bCrypt.compareSync(text, hash);
    }
}

module.exports = BCryptService;
