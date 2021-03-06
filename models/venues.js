const db = require('../models/setup');

//creates a venue in the "venues" db
function create(name, address, lat, lng) {
	const queryPromise = db.one(`INSERT INTO venues (name, address, lat, lng) VALUES ($1,$2,$3,$4) RETURNING id`, [name, address, lat, lng]);
	return queryPromise;
}

//locates a venue in the db given its id
function findById(id) {
    return db.oneOrNone(`SELECT * FROM venues WHERE id = $1;`, [id]);
};

//updates a venue in the db given its id
function update(name, city, state, venue_id) {
    return db.one(`UPDATE venues SET name=$1, city=$2, state=$3 WHERE id=$4 RETURNING *`, [name, city, state, venue_id]);
}

module.exports = { create, findById, update };
