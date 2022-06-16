const path = require('path')
const express = require('express')
const hbs = require('hbs')


const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Raymond Li'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        img: '/img/witcher.png',
        name: 'Raymond Li'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Raymond Li',
        msg: 'This is a very helpfull help text.'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {lat, lon, loc} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(lat, lon, (error, forecastData, icon) => {

            console.log(icon)

            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                address: req.query.address,
                location: loc,
                icon,
            })

          })
    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404 Help',
        errorMsg: 'Help article not found.',
        name: 'Raymond Li'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found.',
        name: 'Raymond Li'
    })
})


app.listen(port, () => {
    console.log('Serve is up on port ' + port)
})