const request = require("request")

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2F1c2hhbHRvcCIsImEiOiJja3A2c3JybWwwNDVxMndtamJ1bWF5emN2In0.jViQUzIRW93f57Od5E6dKA&limit=2'
    //You can only write url instead of url: url since the names are same
    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to get the location, you might have a typo', undefined)
        } else {
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            callback(undefined, {
                latitude,
                longitude,
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
