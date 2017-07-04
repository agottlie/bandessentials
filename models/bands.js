const bcrypt = require('bcryptjs');
const giphy = require('giphy-api')();

const db = require('../models/setup');

//creates a new band in the "bands" db
function create(band) {
    const password = bcrypt.hashSync(band.password, 10);
    return db.oneOrNone(`INSERT INTO bands (name, password_digest) VALUES ($1, $2) RETURNING *;`, [band.name, password]);
};

//searches for a band entry in the "bands" db by id
function findByName(name) {
    return db.oneOrNone(`SELECT * FROM bands WHERE name = $1;`, [name]);
};

//updates a band entry with the new band name
function update(name, id) {
    return db.one(`UPDATE bands SET name=$1 WHERE id=$2 RETURNING *`, [name, id]);
}

//returns a random giphy URL
function getGif() {
    return giphy.random({ tag: 'Metalocalypse' });
}


module.exports = { create, findByName, update, getGif };
