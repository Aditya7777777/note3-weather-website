import { fileURLToPath } from 'url'
import path from 'path'
import express from 'express'
import hbs from 'hbs'
import {geocode} from './utils/geocode.js'
import forecast from './utils/forecast.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(path.join(__dirname,'/public'))

const app = express()

//Define paths for Express config 
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname,'/templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Aditya Godse'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Me',
        name:'Aditya Godse'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        helpText:'This is some helpful text.',
        title:'Help',
        name:'Aditya Godse'
    })
})

// Goal: Wire up /weather

// 1. Require geocode/forecast into app.js
// 2. Use the address to geocode
// 3. Use the coordinates to get forecast
// 4. Send back the real forecast and location

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        console.log('Sending address error');
        return res.send({
            error:"You must provide an address"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData) =>{
            if(error){
                return res.send({error})
            }
        })
    })

    res.send({
        "forecast":"clear",
        "location":"philadelphia",
        "address": req.query.address
    })
    
})

// Goal: Update weather endpoint to accept address

// // 1. No address? Send back an error message
// // 2. Address? Send back the static JSON
// - Add address property onto JSON which returns the provided address
// // 3. Test /weather and /weather?address=philadelphia

app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term '
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*splat',(req,res) =>{
   res.render('Error',{
        title:'404',
        name:'Aditya Godse',
        errorMessage:'Help article not found'
    })
})

app.get('/*splat',(req,res) =>{
    res.render('Error',{
        title:'404',
        name:'Aditya Godse',
        errorMessage:'Page Not found'
    })
})


// Goal: Create and render a 404 page with handlebars

// 1. Setup the template to render the header and focter
// 2. Setup the template to render an error message in a paragraph
// 3. Render the template for both 404 routes
// - Page not found.
// - Help article not found.
// 4. Test your work. Visit /what and /help/units

app.listen(3000, () =>{
    console.log('Server is up on port 3000 ')
})

