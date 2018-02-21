'use strict';

var debug = require('debug');
var error = debug('reportModel:error');
var log = debug('reportModel:log');

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');


var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Place = new Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    long: {
        type: String
    },
    lat: {
        type: String
    },
    address: {
        type: String
    },
    openingTime: {
        type: String
    },
    rating: {
        type: String
    }
});


// Route.set('toJSON', {
//     transform: function (doc, ret, options) {
//         return ret;
//     }
// });

module.exports = mongoose.model('Place', Place);