const db = require('../models/setup');

function findTour(band) {
    return db.query(`SELECT tour_date, venues.name, venues.city, venues.state, venues.id FROM tours,venues WHERE tours.band_id=$1 AND tours.venue_id = venues.id`, [band.id]);
}

function create(band_id, tour_date, venue_id) {
	return db.one(`INSERT INTO tours (band_id, tour_date, venue_id) VALUES ($1,$2,$3) RETURNING *`, [band_id, tour_date, venue_id])
}

module.exports = { findTour, create };
