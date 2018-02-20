'use strict';

var debug = require('debug');
var error = debug('generalRoutes:error');
var log = debug('generalRoutes:log');

var express = require('express');
var router = express.Router();



//
// ─── CONTROLLERS ────────────────────────────────────────────────────────────────
//

var userController = require('../serverControllers/userController');





//
// ─── USERS ──────────────────────────────────────────────────────────────────────
//


router.route('/register')
    .post(userController.registerUser);

router.route('/login')
    .post(userController.login);

router.route('/:userId/profile')
    .get(userController.getAllUserData)
    .post(userController.updateUserData);
//
// ───────────────────────────────────────────────────── USERS ─────
//




module.exports = router;