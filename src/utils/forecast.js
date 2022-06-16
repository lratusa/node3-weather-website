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
            humidity = body.current.humidity
            UVIndex = body.current.uv_index
            weatherIcon = body.current.weather_icons[0]
            console.log(weatherIcon)
            if (UVIndex < 0) {
                UVMsg = ''
            }else if (UVIndex <= 2) {
                UVMsg = 'Low danger from the sun\'s UV rays. Wear sunglasses on bright days.'
            } else if (UVIndex <= 5) {
                UVMsg = 'Moderate risk of harm from unprotected sun exposure.  wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.'
            } else if (UVIndex <= 7) {
                UVMsg = ' high risk of harm from unprotected sun exposure. Protection against skin and eye damage is needed.'
            } else if (UVIndex <=10) {
                UVMsg = 'very high risk of harm from unprotected sun exposure. Take extra precautions because unprotected skin and eyes will be damaged and can burn quickly.'
            } else {
                UVMsg = 'extreme risk of harm from unprotected sun exposure. Take all precautions because unprotected skin and eyes can burn in minutes. '
            }
            description = body.current.weather_descriptions[0]
            msg = description + '. It is currently ' + temp + ' degree out. It feels like ' + feelslike + ' degrees out. Humidity is ' + humidity + '%. The UV Index is ' + UVIndex + '. ' + UVMsg
            callback(undefined, msg, weatherIcon)
        }
    })
}

module.exports = forecast