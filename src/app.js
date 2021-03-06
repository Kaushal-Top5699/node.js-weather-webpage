const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express
const publicDirectoryPath = path.join(__dirname, '../public') //this will allow us to access files in public folder
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs') //This line is reuired for hndlerbars to setup
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    //render allows us to render handlerbars templates
    res.render('index', {
        title: 'Weather Forcast',
        name: 'Kaushal'
    })
})

app.get('/about', (req, res) => {

    //Again we use render for handlebar file
    res.render('about', {
        title: 'About Me',
        name: 'Kaushal'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help',
        para: 'How can I help you ?',
        name: 'Kaushal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'adress not provided!'
        })
    }
    geocode(req.query.address, (error, { latitude: lat, longitude: lon, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forcast(lat, lon, (error, { temperature, weatherDsecription, feels_like, chanceOfRain, humidity } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                address: location,
                temperature,
                weather_description: weatherDsecription,
                chance_of_rain: chanceOfRain,
                feels_like,
                humidity
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        error_message: 'Help article not found',
        name: 'Kaushal'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404!',
        error_message: 'Page not found',
        name: 'Kaushal'
    })
})

app.listen(port, () => {
    console.log('Server is up on PORT: ' + port)
})