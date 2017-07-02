const Venue = require('../models/venues');
const VenueAPI = require('../services/venues')
const Tour = require('../models/tours');
const Band = require('../models/bands');
const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const util = require('util');
const venueData = {};

//RENDER NEW DATE PAGE
router.get('/new', auth.restrict, (req, res) => {
    res.render('dates/new', { id: req.user.id });
});

//RENDER EDIT DATE PAGE
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

//RENDER SEARCH RESULTS PAGE
router.get('/search', auth.restrict, (req, res) => {
    res.render('dates/search', venueData);
})

//SEARCH FOR RESULTS THROUGH API
router.get('/search/:date/:name/:city/:state/:id', auth.restrict, (req, res) => {
    const query = req.params.name + "+" + req.params.city + "+" + req.params.state;

    venueData.id = req.user.id;
    venueData.date_id = req.params.id;
    venueData.date = req.params.date;
    if (req.params.id === "null") {
        venueData.link = "new";
    } else {
        venueData.link = "edit/" + req.params.id;
    }

    VenueAPI
        .getVenue(query)
        .then((data) => {
            venueData.data = data;
            res.render('dates/search', venueData);
        })
        .catch(err => console.log('ERROR: ', err));

    return venueData;
})

//ADD TOUR DATE
router.post('/', (req, res) => {
    const band_id = req.user.id,
        name = req.body.name,
        date = req.body.date,
        address = req.body.address,
        lat = req.body.lat,
        lng = req.body.lng;

    Venue
        .create(name, address, lat, lng)
        .then((data) => {
            return Tour.create(band_id, date, data.id)
        })
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: ', err));
});

//EDIT TOUR DATE
router.put('/', (req, res) => {
    const band_id = req.user.id,
        name = req.body.name,
        date = req.body.date,
        address = req.body.address,
        lat = req.body.lat,
        lng = req.body.lng,
        date_id = req.body.date_id;


    Venue
        .create(name, address, lat, lng)
        .then((data) => {
            return Tour.update(date, data.id, band_id, date_id);
        })
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: ', err));
});

//DELETE TOUR DATE
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
