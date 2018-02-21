'use strict';

var debug = require('debug');
var error = debug('reportModel:error');
var log = debug('reportModel:log');

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var RouteModel = require('./routeModel');
var PlaceModel = require('./placeModel');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var User = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    image: {
        type: String
    },
    savedRoutes: [{
        type: Schema.Types.ObjectId,
        ref: "RouteModel"
    }],
    savedPlaces: [{
        type: Schema.Types.ObjectId,
        ref: "PlaceModel"
    }]
}, {
        timestamps: true
    });


User.set('toJSON', {
    transform: function (doc, ret, options) {
        return ret;
    }
});

module.exports = mongoose.model('User', User);
