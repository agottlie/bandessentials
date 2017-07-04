const axios = require('axios');

//perform Google Places API call using the venue's lat & lng, and performing a query based on meal
function getRestaurant(venue, food) {
    const lat = venue.lat,
        lng = venue.lng;

    const queryPromise = axios({
        url: `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${lat},${lng}&radius=500&type=restaurant&query=${food}&key=${process.env.GOOGLE_ID}`,
        method: 'GET'
    })

    return queryPromise;
};

module.exports = { getRestaurant };
