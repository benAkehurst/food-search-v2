const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

//
// ──────────────────────────────────────────────────────────── I ──────────
//   :::::: G E T   R O U T E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────
//
// Get all posts
router.get('/posts', (req, res) => {
    // Get posts from the mock api
    // This should ideally be replaced with a service that connects to MongoDB
    axios.get(`${API}/posts`)
        .then(posts => {
            res.status(200).json(posts.data);
        })
        .catch(error => {
            res.status(500).send(error)
        });
});


//
// ──────────────────────────────────────────────────────────── II ──────────
//   :::::: G E T   R O U T E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────
//

//
// ────────────────────────────────────────────────────────────── I ──────────
//   :::::: P O S T   R O U T E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
//
// register user method
app.post('/registerUser', function (req, res, next) {
    var data = req.body;
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
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});


//
// ────────────────────────────────────────────────────────────── II ──────────
//   :::::: P O S T   R O U T E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────
//



//
// ────────────────────────────────────────────────────────────────── I ──────────
//   :::::: D E L E T E   R O U T E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────
//



//
// ────────────────────────────────────────────────────────────────── II ──────────
//   :::::: D E L E T E   R O U T E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────
//

module.exports = router;