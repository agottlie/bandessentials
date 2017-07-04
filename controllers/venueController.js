const Venue = require('../models/venues');
const Tour = require('../models/tours');
const Band = require('../models/bands');
const Restaurant = require('../services/restaurants');
const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const util = require('util');

//renders the venue page when the user wants to "Explore" a venue
router.get('/:id', auth.restrict, (req, res) => {
    const id = req.params.id,
        venueRestaurants = {};

    //searches for a venue and then uses the Google Places API to find restaurants nearby using the queries noted below
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
            res.render('venues/show', { venueRestaurants });
        })
});

module.exports = router;
