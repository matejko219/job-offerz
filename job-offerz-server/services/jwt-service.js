/**
 * Created by DELL on 2017-10-09.
 */
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const JwtService = {
    generateToken: (user) => {
        user.password = null;
        const payload = {
            user
        };

        try {
            return jwt.sign(payload, config.jwtSecret, {
                expiresIn: '1h'
            });
        } catch (err) {
            console.log('JWT not generated: ' + err.message);
            const error = new Error('JWT not generated.');
            throw error;
        }
    },
    verifyToken: (token, callback) => {
        token = token.substring(7, token.length);
        jwt.verify(token, config.jwtSecret, callback);
    }
};

module.exports = JwtService;
