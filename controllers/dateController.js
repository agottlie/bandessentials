const Venue = require('../models/venues');
const Tour = require('../models/tours');
const Band = require('../models/bands');
const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');

router.get('/new', auth.restrict, (req, res) => {
    Band
        .findByName(req.user.name)
        .then((band) => {
            res.render('dates/new', { id: req.user.id });
        })
});

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

module.exports = router;
