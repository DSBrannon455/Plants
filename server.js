const express = require('express')
const app = express()
const plant = require('./models/plant.js')
const PORT = 3000

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

// Show route
app.get('/plant/:id', (req, res) => {
    //res.send(pokemon[req.params.id])

    res.render('show.ejs', {
        plant: plant[req.params.id]
    })

})

app.listen(3000, () => {
    console.log('Server is listening!!!')
})