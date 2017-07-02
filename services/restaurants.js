const axios = require('axios');

function getRestaurant(venue, food) {
    const lat = venue.lat,
        lng = venue.lng;

    const queryPromise = axios({
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=restaurant&keyword=${food}&key=AIzaSyCut-L_vs6oH3mQJ7hW8r827qpD8f1E6h4`,
        method: 'GET'
    })

    return queryPromise;
};

module.exports = { getRestaurant };
