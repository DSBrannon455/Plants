const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const plant = require('./models/plant.js')

// Here we are requiring the PLANT CONTROLLER


//Dependencies

const mongoose = require('mongoose')

// connect to Mongo and have it connect to the sub-database plants
// if it does not exist it will be created

// Global configuration
const mongoURI = process.env.MONGODBURI
const db = mongoose.connection

// Connect to Mongo
mongoose.connect(mongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log('the connection with mongod is established')
})

// Optional: provide error/success messages about the connections
db.on('error', (err) => console.log(err.message + 'is mongod not running?'))
db.on('connected', () => ('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))


// MIDDLEWARE
app.use(express.urlencoded({extended: true}))

// include method override packge
// allows for use of PUT and DELETE requests on our forms
// https://www.npmjs.com/package/method-override#override-using-a-query-value
const methodOverride = require('method-override')

// HTTP METHODS
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

// these following methods are known as middleware and help us handle our requests BEFORE we send it back as a response

// tell the app to use method override
// We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'))

// set up static assets (images/css/client-side JS/etc/audio)
// https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.send('Welcome to the Plant App')
})

// //Set up New ROUTE "new.ejs"
// app.get('/plant/new', (req, res)=>{
//     res.render('new.ejs')
//     console.log(req.body)
// })

// //Index route
// app.get("/plant", (req,res) => {
//     //res.send(plant)
//     res.render('index.ejs', {
//         plant: plant
//     })
// })

// app.post('/plant', (req,res) => {
//     console.log(req.body)
//     plant.push(req.body)
//     res.redirect('/plant')
// })

// app.delete('/plant/:id', (req, res) => {
//     // remove the item from the array
//     plant.splice(req.params.id, 1)
//     // redirect back to the index
//     res.redirect('/plant')
// })

// // Show route
// app.get('/plant/:id', (req, res) => {
//     //res.send(pokemon[req.params.id])

//     res.render('show.ejs', {
//         plant: plant[req.params.id]
//     })

// })

// // Create an edit route to render the edit.ejs
// // Setting up EDIT ROUTE
// app.get('/plant/:id/edit', (req, res)=>{

    

//     res.render('edit.ejs', {
//       plant: plant[req.params.id], // sending the plant object to be edit
//       id: req.params.id // passing the index of the plant
//     })

// })

// // setting up PUT route
// app.put('/plant/:id', (req,res)=>{
  
//     //  this will replace the plant[id] to req.body
//     plant[req.params.id] = req.body;
  
//     // will send back to the the index page.
//     res.redirect('/plant')
  
//   })

//We want to import the plant controller
//const express = require('express')
const plantCon = require('./controllers/plant.js')
app.use('/plant', plantCon)

app.listen(PORT, () => {
    console.log('Server is listening!!!')
})