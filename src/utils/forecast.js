const request = require('request')

const forecast = (lat, lon, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=b7c73d7da4fee0935af74564b705d030&query=' + lat + ',' + lon
    
    request ({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the weather server.', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            temp = body.current.temperature
            feelslike = body.current.feelslike
            description = body.current.weather_descriptions[0]
            msg = description + '. It is currently ' + temp + ' degree out. It feels like ' + feelslike + ' degrees out.'
            callback(undefined, msg)
        }
    })
}

module.exports = forecast