const request = require("request")


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f7438b3fe85116e897b08326b03d3f2e&query=' + latitude + ',' + longitude + '&units=f'

    /* request({ url : url, json: true}, (error, response) => {
        if (error) {
            //console.log or email or log in a file
            callback('Unable to connect to weather services.', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            //console.log('It is currently ' + response.body.current.temperature + ' degrees out there. But it feels like ' + response.body.current.feelslike)
            //console.log('There is a ' + response.body.current.precip + ' change of rain and the humidity level is ' + response.body.current.humidity + '.')
            callback(undefined, response.body.current.weather_descriptions[0])
        }
    }) */

    //  DESC AND SHORTHAND
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            //console.log or email or log in a file
            callback('Unable to connect to weather services.', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            //console.log('It is currently ' + response.body.current.temperature + ' degrees out there. But it feels like ' + response.body.current.feelslike)
            //console.log('There is a ' + response.body.current.precip + ' change of rain and the humidity level is ' + response.body.current.humidity + '.')
            callback(undefined, body.current.weather_descriptions[0])
        }
    })
}

module.exports = forecast
