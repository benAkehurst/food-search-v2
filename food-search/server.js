//
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V E R   D E P E N D E N C I E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const request = require('request');
const rp = require('request-promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongooseUniqueValidator = require('mongoose-unique-validator');
//
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V E R   C O N F I G U R A T I O N : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// Makes Express avaliable
const app = express();
// Get our API routes
const api = require('./server/serverRoutes/api');
// Schemas
const User = require('./server/serverModels/userModel');
const Route = require('./server/serverModels/routeModel');
// Requirements
require('dotenv').config()
// Setting default server settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
app.use(express.static(path.join(__dirname, 'dist'))); // Point static path to dist
// app.use('/api', api); // Set our api routes - if i want to use an api for a bigger project

// Connect to DB with mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/MunchDB", function (err) {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Connected to Database")
    }
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V E R   R O U T E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
/**
 * Registers a user in the database
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
app.post('/registerUser', function (req, res, next) {
    var data = req.body.data;
    var user = new User({
        name: data.name,
        email: data.email,
        password: bcrypt.hashSync(data.password, 10)
    });
    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred with sign up',
                error: err
            });
        }
        var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
        res.status(201).json({
            message: 'User created',
            success: true,
            token: token,
            obj: result
        });
    });
});

/**
 * Logs in a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
app.post('/login', function (req, res, next) {
    var data = req.body;
    User.findOne({ email: data.email }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        }
        if (!bcrypt.compareSync(data.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        }
        var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});

/**
 * Gets the users location from thier current ip address to use in the call to google places api
 */
var userLocaionViaIP = '';
var options = { uri: 'http://ipinfo.io', headers: { 'User-Agent': 'Request-Promise' }, json: true };
rp(options)
    .then(function (userLocation) {
        userLocaionViaIP = userLocation;
    })
    .catch(function (err) {
        if (err) {
            userLocaionViaIP = 'error finding location';
        }
    });


/**
 * Calls Google Places API to get 20 loactions around the user
 * This is a call with default Params
 * @param {*} req
 * @param {*} res
 */
app.post('/routeOptions', function (req, res) {
    var data = req.body;
    console.log('Requesting Places from Goolge API');
    var base = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
    // var longLat = data.location;
    var longLat = userLocaionViaIP.loc;
    var radius = data.radius;
    var type = data.type;
    var key = "&key=" + process.env.GOOGLE_PLACES_API_KEY;
    console.log(key);
    var searchTerm = base + longLat + radius + type + key;
    console.log(searchTerm);
    request(searchTerm, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var options = JSON.parse(body)
            // do more stuff
            // console.log(options);
            res.send(options);
            console.log('Places sent to FE');
        }
    })
});

// TODO: Make a call to Facebook API to get places...

/**
 * Builds a string to get an image of a location from Google Places API
 * @param {*} req
 * @param {*} res
 */
app.post('/getPlaceImage', function (req, res) {
    console.log("Requesting Image url");
    var base = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=";
    var location = req.body.ref;
    var sensor = "&sensor=false";
    var key = "&key=" + process.env.GOOGLE_PLACES_API_KEY;
    var photoUrl = base + location + sensor + key;
    res.send(photoUrl);
    console.log("Photo Url sent to FE");
});

/**
 * Gets the whole user object from the database for the user profile
 * @param {*} req
 * @param {*} res
 */
app.get("/userInfo/:userId", function (req, res) {
    User.findById({ _id: req.params.userId }).exec(function (err, user) {
        if (err) {
            console.log("Error: " + " " + err);
        } else {
            // console.log(user);
            res.send(user);
            console.log("Returned user to login");
        }
    })
});

/**
 * Saves a new route to the user model in the database
 * @param {*} req
 * @param {*} res
 */
app.post("/saveRoute", function (req, res) {
    var data = req.body.routes;
    var newRoute = {
        locationOne: data.loc1,
        locationTwo: data.loc2,
        locationThree: data.loc3
    }
    User.findByIdAndUpdate(req.body.uid, { "$push": { "savedRoutes": newRoute } }).exec(function (err, user) {
        if (err) {
            console.log("Error: " + err)
        }
        res.send({ success: true });
    })
});

/**
 * Removes a route from the user model in the database
 * @param {*} req
 * @param {*} res
 */
app.delete("/deleteRoute/:uid/:_id", function (request, response) {
    // console.log("ID" + request.params.id);
    User.findOne({ id: request.body.id })
        .exec(function (err, user) {
            if (err) {
                console.log("Error" + " " + err)
            } else {
                if (user) {
                    console.log("User " + user);
                    for (var i = 0; i < user.routes.length; i++) {
                        if (user.routes[i]._id == request.params._id) {
                            user.routes.splice(i, 1)
                            user.save();
                        }
                    }
                    response.send(user);
                }
            }
        })
});

//
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: S E R V E R   R U N   C O M M A N D S   A N D   P O R T   A C C E S S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
// Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);
// Creates an HTTP server
const server = http.createServer(app);
// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));