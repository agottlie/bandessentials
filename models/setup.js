pgp = require('pg-promise')();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'bandessentials',
    user: 'andrewgottlieb'
};

const db = pgp(cn);

module.exports = db;