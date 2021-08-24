const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2FybG9zamFjaW50b2RldiIsImEiOiJja3F2bWVtdDgwZzAxMnZxcG5kZnQzMHFqIn0.vrVcU41IevY2CHhb6nMumw&limit=1'
    // ? becomes %3F

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            //console.log or email or log in a file
            callback('Unable to connect to location services.', undefined)

        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode