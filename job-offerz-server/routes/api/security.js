/**
 * Created by DELL on 2017-10-16.
 */
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const GrantedToken = require('../../models/granted-token');
const JwtService = require('../../services/jwt-service');
const handleError = require('../../middlewares/error-handlers').handleError;
const BCryptService = require('../../services/bcrypt-service');
const jwtGuard = require('../../middlewares/jwt-guard');
const AuthoritiesConsts = require('../../models/utils/authorities-consts');
const requiredParams = require('../../middlewares/params-resolvers/required-params');

/**
 * POST /api/authenticate
 * @param obiekt klasy Credentials
 * @return wygenerowany token dostępu
 */
router.post('/authenticate', requiredParams(['body.login', 'body.password']), (req, res, next) =>{
    const login = req.body.login;
    const password = req.body.password;

    User.findOne({$or: [{login: login}, {email: login}]}, (err, user) =>{
        if (err) {
            return handleError('Błąd autentykacji.', 500, next);
        }

        if (!user) {
            console.log('User: ' + login + ' not found');
            return handleError('Błąd autentykacji. Użytkownik nie istnieje.', 400, next);
        } else {
            if (!user.active) {
                return handleError('Konto użytkownika nieaktynwe.', 400, next);

            } else if (!BCryptService.compareHash(password, user.password)) {
                return handleError('Błąd autentykacji. Złe hasło.', 400, next);

            } else {
                let generatedToken;
                try {
                    generatedToken = JwtService.generateToken(user);
                } catch (err) {
                    return handleError('Błąd podczas generowania tokenu.', 500, next);
                }

                GrantedToken.remove({user: user._id}, (err, deletedTokens) =>{
                    if (err) {
                        console.log('Authentication failed. Remove token error.')
                        return handleError('Błąd podczas zapisu tokenu w systemie', 500, next);
                    }

                    console.log('Removed ' + deletedTokens.result.n +' previously granted tokens');

                    new GrantedToken({
                        user: user._id,
                        token: generatedToken
                    }).save((err, grantedToken) =>{
                        if (err) {
                            return handleError('Błąd podczas zapisu tokenu w systemie.', 500, next);
                        }
                        console.log('New granted token saved in db.');

                        return res.json({
                            token: generatedToken
                        });
                    });
                });
            }
        }
    });
});

/**
 * POST /api/signup
 * @param  obiekt klasy User
 * @return true jeśli operacja się powiodła
 */
router.post('/signup', requiredParams(['body.login', 'body.password', 'body.email']), (req, res, next) =>{
    const login = req.body.login;
    const password = req.body.password;
    const email = req.body.email;


    User.findOne({$or: [{login: login}, {email: email}]}, (err, user) =>{
        if (err) return handleError('Błąd podczas rejestracji użytkownika', 500, next);

        if (user) {
            if (user.login === login) {
                return handleError('Użytkownik z loginem: ' + login + ' już istnieje.', 400, next);
            } else {
                return handleError('Użytkownik z adresem email: ' + email + ' już istnieje.', 400, next);
            }
        } else {
            const hash = BCryptService.generateHash(password);

            new User({
                login: login,
                password: hash,
                email: email,
                authority: AuthoritiesConsts.ROLE_USER
            }).save(err =>{
                if (err) return handleError('Błąd podczas rejestracji użytkownika', 500, next);
                else return res.json({
                    success: true
                });
            });
        }
    });
});

/**
 * GET /api/logout
 * @return true jeśli wylogowywanie się powiodło
 */
router.get('/logout', jwtGuard, (req, res, next) =>{
    GrantedToken.remove({user: req.decodedUser._id}, err =>{
        if (err) handleError('Błąd podczas wylogowywania', 500, next);
        else res.json({
            success: true
        });
    });
});

module.exports = router;
