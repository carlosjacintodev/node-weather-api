const path  = require('path')           //  core module
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
//console.log(__filename)
console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000           // locally or heroku

//  DEFINE PATHS FOR EXPRESS CONFIG
const publicDirPath = path.join(__dirname,'../public')
//  if want the views with other name
const viewsPath = path.join(__dirname, './templates/views')       //  if it was on root was ../
//  in this case we must set views for that path
const partialsPath = path.join(__dirname, './templates/partials')

//  SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
//      how to run with nodemon refresh NODEJS_UDEMY\web-server\src> nodemon app.js -e js,hbs
app.set('view engine', 'hbs')           //  handlebars templates
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//  SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirPath))

//  the goal is not use send and use render
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'carlosjacintodev'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'carlosjacintodev'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'carlosjacintodev',
        helpText: 'helpihelpi'
    })
})
/* app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
}) */

/* app.get('/help', (req, res) => {
    res.send([{
        name:'Carlos',
        age: 35
    }, {
        name:'Andrew',
        age: 27
    }])
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
}) */

//  static
/* app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Its is hot af.',
        location: 'Desert'
    })
}) */

//  challenge update the weather endpoint to accept address query 1.no address = error 2.address = static JSON address property on JSON 3.Test /weather?address=philadelphia
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    /* res.send({
        forecast: 'Its is hot af.',
        location: 'Desert',
        address: req.query.address
    }) */
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

//  web-server and api integration
/* app.get('/products' , (req , res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }   // it could be a else and a success code here too
    //  Cannot set headers after they are sent to the client is because we are using 2 sends so use return to stop the 2nd
    console.log(req.query)      //  if I want to grab to search is .search or .rating
    res.send({
       products: []
    })

}) */

//  tell what to do
//  app.com
//  app.com/about
//  app.com/help

//  ERROR HANDLING with wildcards in express *
app.get('/help/*' , (req , res)=>{
   //res.send('Help article not found :(')
    res.render('404', {
        title:'404',
        name: 'carlosjacintodev',
        errorMessage: 'Help page not found, try other.'
   })
})

app.get('*' , (req , res)=>{

   //res.send('404 NOT FOUND')
   res.render('404', {
       title: '404',
       name: 'carlosjacintdev',
       errorMessage: 'Page not found.'
   })
})

app.listen(port, () => {
    console.log('Server is running smoothh...' + port)
})
