const Venue = require('../models/venues');
const Tour = require('../models/tours');
const Band = require('../models/bands');
const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');

router.get('/:id', auth.restrict, (req, res) => {
    const id = req.params.id;

    Venue
        .findById(id)
        .then((venue) => {
            res.render('venues/show', { id: id });
        })
});

module.exports = router;