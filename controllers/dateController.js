const Venue = require('../models/venues');
const VenueAPI = require('../services/venues')
const Tour = require('../models/tours');
const Band = require('../models/bands');
const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const util = require('util');

router.get('/new', auth.restrict, (req, res) => {
    res.render('dates/new', { id: req.user.id });
});

router.get('/edit/:id', auth.restrict, (req, res) => {
    const tour = {};
    const id = req.params.id;

    Tour
        .findDate(id)
        .then((data) => {
            tour.tour = data;
            return Venue.findById(data.venue_id)
        })
        .then((data) => {
            tour.venue = data;
            res.render('dates/edit', { band_id: req.user.id, tour: tour.tour, venue: tour.venue });

        });
});

// router.get('/search', auth.restrict, (req,res) {

// })

router.put('/search', auth.restrict, (req, res) => {
    const query = req.body.name + "+" + req.body.city + "+" + req.body.state,
        id = req.user.id;

    VenueAPI
        .getVenue(query)
        .then((data) => {
            console.log(util.inspect(data, false, null));
            res.render('dates/search', { data, id });
        })
})

router.post('/', (req, res) => {
    const band_id = req.user.id,
        name = req.body.name,
        date = req.body.date,
        city = req.body.city,
        state = req.body.state;

    Venue
        .create(name, city, state)
        .then((data) => {
            return Tour.create(band_id, date, data.id)
        })
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: ', err));
});

router.put('/edit/:id', (req, res) => {
    const band_id = req.user.id,
        name = req.body.name,
        date = req.body.date,
        city = req.body.city,
        state = req.body.state,
        date_id = req.body.date_id;


    Venue
        .create(name, city, state)
        .then((data) => {
            return Tour.update(date, data.id, band_id, date_id);
        })
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: ', err));
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    Tour
        .destroy(id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => console.log('ERROR: ', err));
})

module.exports = router;
