const express = require('express')
const app = express()
const plant = require('./models/plant.js')
const PORT = 3000

app.get('/', (req,res) => {
    res.send('Welcome to the Plant App')
})

//Index route
app.get("/plant", (req,res) => {
    //res.send(plant)
    res.render('index.ejs', {
        plant: plant
    })
})

app.listen(3000, () => {
    console.log('Server is listening!!!')
})