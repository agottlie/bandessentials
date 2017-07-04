const Venue = require('../models/venues');
const VenueAPI = require('../services/venues')
const Tour = require('../models/tours');
const Band = require('../models/bands');
const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const util = require('util');
const venueData = {};

//renders the "add a tour date" page
router.get('/new', auth.restrict, (req, res) => {
    res.render('dates/new', { id: req.user.id });
});

//renders the "edit tour date" page
router.get('/edit/:id', auth.restrict, (req, res) => {
    const tour = {};
    const id = req.params.id;

    //finds the date in the tours db, as well as the current venue associated with that date
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

//render the search results page
router.get('/search', auth.restrict, (req, res) => {
    res.render('dates/search', venueData);
})

//allows for an API search by pulling in all relevant details from the search form as parameters
router.get('/search/:date/:name/:city/:state/:id', auth.restrict, (req, res) => {
    const query = req.params.name + "+" + req.params.city + "+" + req.params.state;

    //dvenue id
    venueData.id = req.user.id;
    //tour date id
    venueData.date_id = req.params.id;

    venueData.date = req.params.date;

    //passes along if the user came from the "edit date" or "new date" page
    if (req.params.id === "null") {
        venueData.link = "new";
    } else {
        venueData.link = "edit/" + req.params.id;
    }

    //calls the Google Place API and then renders the results page with all results
    VenueAPI
        .getVenue(query)
        .then((data) => {
            venueData.data = data;
            res.render('dates/search', venueData);
        })
        .catch(err => console.log('ERROR: ', err));

    return venueData;
})

//adds new tour date to db
router.post('/', (req, res) => {
    const band_id = req.user.id,
        name = req.body.name,
        date = req.body.date,
        address = req.body.address,
        lat = req.body.lat,
        lng = req.body.lng;

    //creates a new venue instance in the "venues" db and then creates a new tour date in the "tours" db referencing the venue id
    Venue
        .create(name, address, lat, lng)
        .then((data) => {
            return Tour.create(band_id, date, data.id)
        })
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: ', err));
});

//edits a tour date
router.put('/', (req, res) => {
    const band_id = req.user.id,
        name = req.body.name,
        date = req.body.date,
        address = req.body.address,
        lat = req.body.lat,
        lng = req.body.lng,
        date_id = req.body.date_id;

    //creates a new venue instance in the "venues" db and then updates a tour date in the "tours" db referencing the venue id
    Venue
        .create(name, address, lat, lng)
        .then((data) => {
            return Tour.update(date, data.id, band_id, date_id);
        })
        .then(data => res.json(data))
        .catch(err => console.log('ERROR: ', err));
});


//deletes a tour date from the db
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    //searches the "tours" db for the id and then deletes that entry
    Tour
        .destroy(id)
        .then((data) => {
            res.json(data);
        })
        .catch(err => console.log('ERROR: ', err));
})

module.exports = router;
