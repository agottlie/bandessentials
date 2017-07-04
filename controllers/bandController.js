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
            return Band.getGif()
        })
        .then((gif) => {
            bandInfo.gif = gif.data.image_url;
            res.render('bands/profile', { bandInfo });
        })
        .catch(err => console.log('ERROR:', err));
});

router.get('/edit', auth.restrict, (req, res) => {
    console.log(req.user);
    res.render('bands/edit', { user: req.user });
});

router.put('/edit/', (req, res) => {
    const name = req.body.name,
        id = req.body.id;

    Band
        .update(name, id)
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: ', err));
});

module.exports = router;
