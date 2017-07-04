const axios = require('axios');

function getRestaurant(venue, food) {
    const lat = venue.lat,
        lng = venue.lng;

    const queryPromise = axios({
        url: `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${lat},${lng}&radius=500&type=restaurant&query=${food}&key=AIzaSyCut-L_vs6oH3mQJ7hW8r827qpD8f1E6h4AIzaSyBj9JiE74r9MuEaKriUaL9l4diyhD3dWpE`,
        method: 'GET'
    })

    return queryPromise;
};

module.exports = { getRestaurant };
