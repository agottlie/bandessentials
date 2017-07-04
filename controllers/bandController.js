const Band = require('../models/bands');
const Tour = require('../models/tours');
const router = require('express').Router();
const passport = require('passport');


const auth = require('../services/auth');

//route to create a new user
router.post('/', passport.authenticate(
    'local-signup', {
        failureRedirect: '/bands/new',
        successRedirect: '/bands/profile'
    }
));

//route to render the "create a new band" page
router.get('/new', (req, res) => {
    res.render('bands/new');
});

//logs user out and returns to the home page
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//renders the login page
router.get('/login', (req, res) => {
    res.render('bands/login');
});

//checks if the user's password is correct at the login page
router.post('/login', passport.authenticate(
    'local-login', {
        failureRedirect: '/bands/login',
        successRedirect: '/bands/profile'
    }
));

//renders the profile page for a user
router.get('/profile', auth.restrict, (req, res) => {
    const bandInfo = {};

    //gets the user info from their ID, and then sources all tour dates associated with that user , and renders it on the page
    Band
        .findByName(req.user.name)
        .then((band) => {
            bandInfo.band = band;
            return Tour.findTour(band)
        })
        .then((tour) => {
            bandInfo.tour = tour;
            return Band.getGif()
        })
        .then((gif) => {
            bandInfo.gif = gif.data.image_url;
            res.render('bands/profile', { bandInfo });
        })
        .catch(err => console.log('ERROR:', err));
});

//renders the "edit band name" page
router.get('/edit', auth.restrict, (req, res) => {
    console.log(req.user);
    res.render('bands/edit', { user: req.user });
});

//updates the user's band name
router.put('/edit/', (req, res) => {
    const name = req.body.name,
        id = req.body.id;

    Band
        .update(name, id)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: ', err));
});

module.exports = router;
