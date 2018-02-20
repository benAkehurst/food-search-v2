'use strict';

var mongoose = require('mongoose'),
    User = require('../serverModels/userModel');




//
// ─── GET ────────────────────────────────────────────────────────────────────────
//

/**
 * Returns the data of the user without populate
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function getUserData(req, res, next) {
    User.findById(req.params.userId, function (err, userData) {
        if (err) {
            return next(err);
        }
        return res.send({ success: true, user: userData });
    });
}

/**
 * Returns the data of the user with populate
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function getAllUserData(req, res, next) {
    User.findById(req.params.userId)
        .populate('askedQuestions')
        .populate('commentedQuestions')
        .exec(function (err, userData) {
            if (err) {
                return next(err);
            }
            return res.send({ success: true, user: userData });
        });
}

//
// ────────────────────────────────────────────────────────────────────── GET ─────
//



//
// ─── POST ───────────────────────────────────────────────────────────────────────
//

/**
 * Register a new User
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function registerUser(req, res, next) {
    var userData = req.body.data;
    var newUser = new User({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        image: userData.image,
        telephoneNumber: userData.telephoneNumber,
        businessName: userData.businessName,
        businessEmployees: userData.businessEmployees,
        businessField: userData.businessField,
        businessRole: userData.businessRole,
        businessAddress: userData.businessAddress,
        businessWebsite: userData.businessWebsite,
        businessLogo: userData.businessLogo,
    });

    newUser.save(function (err, user) {
        if (err) {
            return next(err);
        }
        res.send({ success: true, user: user });
    });
}

/**
 * Try to login and if exist the data then Returns the user without populate
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function login(req, res, next) {
    let email = req.body.data.email, password = req.body.data.password;
    if (email && password) {
        User.findOne({ 'status': { $ne: 'deleted' }, 'email': email, 'password': password }, function (err, user) {
            if (err)
                return next(Error(err));
            else if (!user) {
                return next(Error('הסיסמא או כתובת המייל שגויים'));
            }

            return res.send({ success: true, user: user });
        });
    }
    else
        return next(Error('חלק מהשדות חסרים'));
}


/**
 * Update a current user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function updateUserData(req, res, next) {
    var updatedUser = new User(req.body.data);
    User.findByIdAndUpdate(updatedUser._id, updatedUser, { new: true }, function (err, userData) {
        if (err) {
            return next(err);
        }
        return res.send({ success: true, user: userData });
    });
}




module.exports = {
    registerUser,
    login,
    saveRoute,
    getAllRoutes,
    deleteRoute
}

//
// ───────────────────────────────────────────────────────────────────── POST ─────
//