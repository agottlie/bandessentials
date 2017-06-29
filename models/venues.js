const db = require('../models/setup');

function create(name, city, state) {
	const queryPromise = db.one(`INSERT INTO venues (name, city, state) VALUES ($1,$2,$3) RETURNING id`, [name, city, state]);
	return queryPromise;
}

function findById(id) {
    return db.oneOrNone(`SELECT * FROM venues WHERE id = $1;`, [id]);
};

function update(name, city, state, venue_id) {
    return db.one(`UPDATE venues SET name=$1, city=$2, state=$3 WHERE id=$4 RETURNING *`, [name, city, state, venue_id]);
}

module.exports = { create, findById, update };
