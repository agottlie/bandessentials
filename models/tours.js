const db = require('../models/setup');

//find all tour dates and relevant venue info for a band given its id
function findTour(band) {
    return db.query(`SELECT tours.id, tour_date, venues.name, venues.address, venues.id AS venue_id FROM tours, venues WHERE tours.band_id=$1 AND tours.venue_id = venues.id ORDER BY tour_date`, [band.id]);
}

//find a tour date from the "tours" db given an id
function findDate(id) {
    return db.one(`SELECT * from tours WHERE id=$1`, [id]);
}

//creates a new tour date in the "tours" db and references the venue associated with the date
function create(band_id, tour_date, venue_id) {
    return db.one(`INSERT INTO tours (band_id, tour_date, venue_id) VALUES ($1,$2,$3) RETURNING *`, [band_id, tour_date, venue_id]);
}

//updates a tour date in the "tours" db and references the venue associated with the date
function update(tour_date, venue_id, band_id, date_id) {
    return db.one(`UPDATE tours SET tour_date=$1, venue_id=$2 WHERE band_id=$3 AND id=$4 RETURNING *`, [tour_date, venue_id, band_id, date_id]);
}

//deletes a tour date from the "tours" db
function destroy(id) {
	return db.none(`DELETE FROM tours WHERE id=$1`, [id]);
}

module.exports = { findTour, create, findDate, update, destroy };
