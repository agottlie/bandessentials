const axios = require('axios');

function getVenue(query) {
    const queryPromise = axios({
        url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=AIzaSyBj9JiE74r9MuEaKriUaL9l4diyhD3dWpE`,
        method: 'GET',
    })

    return queryPromise;
}

module.exports = { getVenue };
