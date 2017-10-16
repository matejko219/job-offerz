/**
 * Created by DELL on 2017-10-09.
 */
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const JwtService = {
    generateToken: (user) => {
        const payload = {
            user: {
                id: user._id,
                authority: user.authority
            }
        };

        try {
            return jwt.sign(payload, config.jwtSecret, {
                expiresIn: '1h'
            });
        } catch (err) {
            console.log('JWT not generated: ' + err.message);
            const err = new Error('JWT not generated.');
            throw err;
        }
    },
    verifyToken: (token, callback) => {
        token = token.substring(7, token.length);
        jwt.verify(token, config.jwtSecret, callback);
    }
};

module.exports = JwtService;
