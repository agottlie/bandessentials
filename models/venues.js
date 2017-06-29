const db = require('../models/setup');

function create(name, city, state) {
	const queryPromise = db.one(`INSERT INTO venues (name, city, state) VALUES ($1,$2,$3) RETURNING id`, [name, city, state]);
	return queryPromise;
}

module.exports = { create };
