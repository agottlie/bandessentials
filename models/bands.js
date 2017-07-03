const bcrypt = require('bcryptjs');
const giphy = require('giphy-api')();

const db = require('../models/setup');

function create(band) {
    const password = bcrypt.hashSync(band.password, 10);
    return db.oneOrNone(`
    INSERT INTO bands
    (name, password_digest)
    VALUES
    ($1, $2)
    RETURNING *;`, [band.name, password]);
};

function findByName(name) {
    return db.oneOrNone(`SELECT * FROM bands WHERE name = $1;`, [name]);
};

function update(name, id) {
    return db.one(`UPDATE bands SET name=$1 WHERE id=$2 RETURNING *`, [name, id]);
}

function getGif() {
    return giphy.random({ tag: 'tour life' });
}



module.exports = { create, findByName, update, getGif };
