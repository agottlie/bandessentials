const Venue = require('../models/venues');
const Tour = require('../models/tours');
const Band = require('../models/bands');
const Restaurant = require('../services/restaurants');
const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const util = require('util');

router.get('/:id', auth.restrict, (req, res) => {
    const id = req.params.id,
        venueRestaurants = {};

    Venue
        .findById(id)
        .then(venue => {
            venueRestaurants.venue = venue;
            return Restaurant.getRestaurant(venue, "breakfast");
        })
        .then(data => {
            venueRestaurants.breakfast = data;
            return Restaurant.getRestaurant(venueRestaurants.venue, "lunch");
        })
        .then(data => {
            venueRestaurants.lunch = data;
            return Restaurant.getRestaurant(venueRestaurants.venue, "dinner");
        })
        .then(data => {
            venueRestaurants.dinner = data;
            return Restaurant.getRestaurant(venueRestaurants.venue, "late+night+snacks");
        })
        .then(data => {
            venueRestaurants.snacks = data;
            console.log(util.inspect(venueRestaurants, false, null));
            res.render('venues/show', { venueRestaurants });
        })
});

module.exports = router;
