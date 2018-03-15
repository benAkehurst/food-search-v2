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
// ─── MODELS ─────────────────────────────────────────────────────────────────────
//
const User = require('./server/serverModels/userModel');
const Route = require('./server/serverModels/routeModel');
//
// ─────────────────────────────────────────────────────────────────── MODELS ─────
//
//
// ─── LOGIN AND REGISTER ─────────────────────────────────────────────────────────
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
    var data = req.body.data;
    User.findOne({ email: data.email }, function (err, user) {
        if (err) {
            return res.status(500).json({
                success: false,
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        }
        if (!bcrypt.compareSync(data.password, user.password)) {
            return res.status(401).json({
                success: false,
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        }
        var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
        res.status(200).json({
            message: 'Successfully logged in',
            success: true,
            token: token,
            obj: user
        });
    });
});

/**
 * Sends message from about us to admin
 * @param {*} req
 * @param {*} res
 */
app.post("/sendContactUsMessage", function (req, res) {
    const api_key = 'key-' + process.env.MAILGUN_PUB_API_KEY;
    const DOMAIN = process.env.MAILGUN_DOMAIN;
    const mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN });
    const data = req.body.data;
    const messageDetails = {
        from: data.name  + ' ' + data.email,
        to: process.env.MAILGUN_TO_EMAIL,
        subject: 'Message From Munch User' + ' ' + data.name,
        text: data.message
    };
    console.log(messageDetails);
    mailgun.messages().send(messageDetails, function (error, body) {
        res.send({ 'status': true, 'data': body } )
    });
});
//
// ─────────────────────────────────────────────────────── LOGIN AND REGISTER ─────
//

//
// ─── PLACES WEATHER USER LOCATION ───────────────────────────────────────────────
//
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
 * This call will be used once the location ip has been checked and confirmed on the front end
 */
app.post('/routeOptions', function (req, res) {
    var data = req.body.data;
    console.log(data);
    console.log('Requesting Places from Goolge API');
    var base = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
    var lat = data.lat;
    var lng = data.lng;
    var longLat = userLocaionViaIP.loc;
    var radius = "&radius=1500";
    var type = "&type=cafe&type=bar&type=resturant"
    var key = "&key=" + process.env.GOOGLE_PLACES_API_KEY;
    var searchTerm = base + lat + ',' + lng + radius + type + key;
    // var searchTerm = base + longLat + radius + type + key;
    console.log(searchTerm);
    request(searchTerm, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var options = JSON.parse(body)
            res.send(options);
            console.log('Places sent to FE');
        }
    })
});

/**
 * Builds a string to get an image of a location from Google Places API
 * @param {*} req
 * @param {*} res
 */
app.post('/getPlaceImage', function (req, res) {
    console.log("Requesting Image url");
    // console.log(req.body);
    var base = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=";
    var location = req.body.data;
    // var sensor = "&sensor=false";
    var key = "&key=" + process.env.GOOGLE_PLACES_API_KEY;
    var photoUrl = base + location + key;
    // console.log(photoUrl);
    res.send( { 'status': true, 'data': photoUrl} );
    console.log("Photo Url sent to FE");
}); 

/**
 * Gets the current weather
 * @param {*} req
 * @param {*} res
 */
app.post('/currentWeather', function (req, res) {
    var baseUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
    var city = userLocaionViaIP.city;
    var country = userLocaionViaIP.country;
    var comma = ",";
    var mode = "&mode=json";
    var key = "&APPID=" + process.env.OPEN_WEATHER_MAP_API_KEY;
    var searchUrl = baseUrl + city + comma + country + mode + key;
    console.log(searchUrl);
    request(searchUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var weather = JSON.parse(body)
            res.send(weather);
            console.log('weather sent to FE');
        }
    })
});
//
// ───────────────────────────────────────────── PLACES WEATHER USER LOCATION ─────
//

//
// ─── USER SPECIFIC ROUTES ───────────────────────────────────────────────────────
//
/**
 * Gets the whole user object from the database for the user profile
 * @param {*} req
 * @param {*} res
 */
app.get("/userInfo/:_id", function (req, res) {
    console.log(req.body);
    console.log(req.params._id);
    // User.findById()
    //     // .populate({
    //     //     path: 'savedRoutes',
    //     //     model: 'Route'
    //     // })
    //     .exec(function (err, userData) {
    //         if (err) {
    //             console.log("Error: " + " " + err);
    //             res.send({success: false, message: err});
    //         } else {
    //             console.log(userData);
    //             res.send({success: true, user: userData})
    //         }
    //     })
});

/**
 * Saves a new route to the user model in the database
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
app.post("/saveRoute", function (req, res, next) {
    const data = req.body.data;
    const userId = req.body.data.user;
    const objectId = mongoose.Types.ObjectId(userId);

    const newRoute = new Route({
        locationOne: data.route.locationOne,
        locationTwo: data.route.locationTwo,
        locationThree: data.route.locationThree,
        user: objectId
    });
    newRoute.save(function (err, route) {
        if (err) {
            return next(err);
        }
        User.findByIdAndUpdate(
            userId,
            { $push: { savedRoutes: route._id } },
            function (err, user) {
                if (err) {
                    return next(err);
                }
                res.send({
                    success: true,
                    message: 'route saved'
                });
            }
        );
    });
});

/**
 * Saves a new place to the user model in the database
 * @param {*} req
 * @param {*} res
 */
app.post("/:userId/savePlace", function (req, res) {
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
app.delete("/:userId/deleteRoute", function (req, res) {
    // console.log("ID" + request.params.id);
    User.findOne({ id: req.body.id })
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
                    res.send(user);
                }
            }
        })
});

/**
 * Removes a route from the user model in the database
 * @param {*} req
 * @param {*} res
 */
app.delete("/:userId/deletePlace", function (req, res) {
    // console.log("ID" + request.params.id);
    User.findOne({ id: req.body.id })
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
                    res.send(user);
                }
            }
        })
});



//
// ───────────────────────────────────────────────────── USER SPECIFIC ROUTES ─────
//

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