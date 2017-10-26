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

/* POST /api/authenticate user. */
router.post('/authenticate', (req, res, next) =>{
    const login = req.body.login;
    if (!login || login === '') {
        return handleError('Parametr login jest wymagany.', 400, next);
    }

    const password = req.body.password;
    if (!password || password === '') {
        return handleError('Parametr hasło jest wymagany.', 400, next);
    }

    User.findOne({$or: [{login: login}, {email: login}]}, (err, user) =>{
        if (err) {
            return handleError('Błąd autentykacji.', 500, next);
        }

        if (!user) {
            console.log('User: ' + login + ' not found');
            return handleError('Błąd autentykacji. Użytkownik nie istnieje.', 400, next);
        } else {
            if (!BCryptService.compareHash(password, user.password)) {
                return handleError('Błąd autentykacji. Złe hasło.', 400, next);
            } else {
                let generatedToken;
                try {
                    generatedToken = JwtService.generateToken(user);
                } catch (err) {
                    return handleError('Błąd podczas generowania tokenu.', 500, next);
                }

                GrantedToken.remove({user_id: user._id}, (err, deletedTokens) =>{
                    if (err) {
                        console.log('Authentication failed. Remove token error.')
                        return handleError('Błąd podczas zapisu tokenu w systemie', 500, next);
                    }

                    console.log('Removed ' + deletedTokens.result.n +' previously granted tokens');

                    new GrantedToken({
                        user_id: user._id,
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

/* POST /api/signup new user. */
router.post('/signup', (req, res, next) =>{
    const login = req.body.login;
    if (!login || login === '') {
        return handleError('Parametr login jest wymagany.', 400, next);
    }

    const password = req.body.password;
    if (!password || password === '') {
        return handleError('Parametr hasło jest wymagany.', 400, next);
    }

    const email = req.body.email;
    if (!email || email === '') {
        return handleError('Parametr email jest wymagany.', 400, next);
    }

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

// Set route jwt guard
router.use(jwtGuard);

/* GET /api/logout user. */
router.get('/logout', (req, res, next) =>{
    GrantedToken.remove({user_id: req.decodedUser.id}, err =>{
        if (err) handleError('Błąd podczas wylogowywania', 500, next);
        else return res.json({
            success: true
        });
    });
});

module.exports = router;
