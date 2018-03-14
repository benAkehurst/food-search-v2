'use strict';

var debug = require('debug');
var error = debug('reportModel:error');
var log = debug('reportModel:log');

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var UserModel = ('./userModel.js');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Route = new Schema({
    locationOne: { type: Object },
    locationTwo: { type: Object },
    locationThree: { type: Object },
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },
});


Route.set('toJSON', {
    transform: function (doc, ret, options) {
        return ret;
    }
});

module.exports = mongoose.model('Route', Route);