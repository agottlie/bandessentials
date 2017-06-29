const Band = require('../models/bands');
const Tour = require('../models/tours');
const router = require('express').Router();
const passport = require('passport');

const auth = require('../services/auth');

router.post('/', passport.authenticate(
    'local-signup', {
        failureRedirect: '/bands/new',
        successRedirect: '/bands/profile'
    }
));

router.get('/new', (req, res) => {
    res.render('bands/new');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('bands/login');
});

router.post('/login', passport.authenticate(
    'local-login', {
        failureRedirect: '/bands/login',
        successRedirect: '/bands/profile'
    }
));

router.get('/profile', auth.restrict, (req, res) => {
    const bandInfo = {};
    Band
        .findByName(req.user.name)
        .then((band) => {
            bandInfo.band = band;
            return Tour.findTour(band)
        })
        .then((tour) => {
            bandInfo.tour = tour;
            console.log(bandInfo.tour);
            res.render('bands/profile', { bandInfo });
        })
        .catch(err => console.log('ERROR:', err));
});

module.exports = router;
