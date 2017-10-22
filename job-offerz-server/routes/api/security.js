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
        return handleError('login property is required.', 400, next);
    }

    const password = req.body.password;
    if (!password || password === '') {
        return handleError('password property is required.', 400, next);
    }

    User.findOne({
        login: login
    }, (err, user) =>{
        if (err) {
            return handleError('Authentication failed. DB error - User.', 500, next);
        }

        if (!user) {
            console.log('User: ' + login + ' not found');
            return handleError('Authentication failed. User not found.', 400, next);
        } else {
            if (!BCryptService.compareHash(password, user.password)) {
                return handleError('Authentication failed. Wrong password.', 400, next);
            } else {
                let generatedToken;
                try {
                    generatedToken = JwtService.generateToken(user);
                } catch (err) {
                    return handleError('Authentication failed. JWT not generated.', 500, next);
                }

                GrantedToken.remove({user_id: user._id}, (err, deletedTokens) =>{
                    if (err) {
                        return handleError('Authentication failed. DB error.', 500, next);
                    }

                    console.log('Removed ' + deletedTokens.result.n +' previously granted tokens');

                    new GrantedToken({
                        user_id: user._id,
                        token: generatedToken
                    }).save((err, grantedToken) =>{
                        if (err) {
                            return handleError('Authentication failed. DB error - GT not saved.', 500, next);
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
        return handleError('login property is required.', 400, next);
    }

    const password = req.body.password;
    if (!password || password === '') {
        return handleError('password property is required.', 400, next);
    }

    User.findOne({login: login}, (err, user) =>{
        if (err) return handleError('Error while signup new user', 500, next);

        if (user) {
            return handleError('User with login: ' + login + ' already exist.', 400, next);
        } else {
            const hash = BCryptService.generateHash(password);

            new User({
                login: login,
                password: hash,
                authority: AuthoritiesConsts.ROLE_USER
            }).save(err =>{
                if (err) return handleError('Error while signup new user', 500, next);
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
        if (err) handleError('Error while logout', 500, next);
        else return res.json({
            success: true
        });
    });
});

module.exports = router;
