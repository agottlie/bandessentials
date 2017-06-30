const axios = require('axios');

    function getVenue(query) {
        const queryPromise = axios({
            url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=AIzaSyCut-L_vs6oH3mQJ7hW8r827qpD8f1E6h4`,
            method: 'GET',
        })

        return queryPromise;
    }

module.exports = { getVenue };