const express = require('express')
const app = express()
const plant = require('./models/plant.js')
const PORT = 3000

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

//Set up New ROUTE "new.ejs"
app.get('/plant/new', (req, res)=>{
    res.render('new.ejs')
    console.log(req.body)
})

//Index route
app.get("/plant", (req,res) => {
    //res.send(plant)
    res.render('index.ejs', {
        plant: plant
    })
})

app.post('/plant', (req,res) => {
    console.log(req.body)
    plant.push(req.body)
    res.redirect('/plant')
})

app.delete('/plant/:id', (req, res) => {
    // remove the item from the array
    plant.splice(req.params.id, 1)
    // redirect back to the index
    res.redirect('/plant')
})

// Show route
app.get('/plant/:id', (req, res) => {
    //res.send(pokemon[req.params.id])

    res.render('show.ejs', {
        plant: plant[req.params.id]
    })

})

// Create an edit route to render the edit.ejs
// Setting up EDIT ROUTE
app.get('/plant/:id/edit', (req, res)=>{

    

    res.render('edit.ejs', {
      plant: plant[req.params.id], // sending the plant object to be edit
      id: req.params.id // passing the index of the plant
    })

})



app.listen(3000, () => {
    console.log('Server is listening!!!')
})