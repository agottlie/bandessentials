const bcrypt = require('bcryptjs');

const db = require('../models/setup');

function create(band) {
    const password = bcrypt.hashSync(band.password, 10);
    console.log("you reached create!");
    return db.oneOrNone(`
    INSERT INTO bands
    (name, password_digest)
    VALUES
    ($1, $2)
    RETURNING *;`, [band.name, password]);
};

function findByName(name) {
    return db.oneOrNone(`
    SELECT *
    FROM bands
    WHERE name = $1;`, [name]);
};


module.exports = { create, findByName };