const axios = require('axios');

//perform Google Places API call using the name, city, and state input by the user
function getVenue(query) {
    const queryPromise = axios({
        url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.GOOGLE_ID}`,
        method: 'GET',
    })

    return queryPromise;
}

module.exports = { getVenue };
