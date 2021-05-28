const request = require('request')

const forcast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=a3b2da9fa9fecebed34e37d226264fd2&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to service', undefined)
        } else if (response.body.error) {
            callback('Unable to find info.', undefined)
        } else {

            const temperature = response.body.current.temperature
            const weatherDsecription = response.body.current.weather_descriptions[0]
            const feels_like = response.body.current.feelslike
            const chanceOfRain = response.body.current.precip

            const weatherData = {
                temperature,
                weatherDsecription,
                feels_like,
                chanceOfRain
            }
            callback(undefined, weatherData)
        }
    })
}

module.exports = forcast