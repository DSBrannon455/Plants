const express = require('express')
const Plant = require('../models/plant')
const router = express.Router()



//Index route
router.get('/', (req,res) => {
    //res.send(plant)
    // res.render('index.ejs', {
    //     plant: plant
    // })
    Plant.find((error, plants) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Document successfully retrieved')
            console.log(plants)
            res.render('index.ejs', {
                plant: plants
            })
        }
    })
    
})

//Set up New ROUTE "new.ejs"
router.get('/new', (req, res)=>{
    res.render('new.ejs')
    console.log(req.body)
})

// plant show route -- GET /plant/:id -- info about JUST ONE plant
router.get('/:id', (req, res) => {
    Plant.findById(req.params.id, (err, plant) => {
        res.render('show.ejs', { plant: plant })
    })
})

// set up POST ROUTE "Create"
router.post('/', (req,res) => {
    console.log(req.body)
    //plant.push(req.body)
    Plant.create(req.body, (error, plant) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Document successfully inserted in the database')
            console.log(plant)
        }
    })

    res.redirect('/plant')
})

router.delete('/:id', (req, res) => {
    // remove the item from the array
    Plant.findByIdAndRemove(req.params.id, (error, plant) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Document successfully deleted from the database')
        }
    })
    // redirect back to the index
    res.redirect('/plant')
})

// Show route
// router.get('/:id', (req, res) => {
//     //res.send(pokemon[req.params.id])

//     // res.render('show.ejs', {
//     //     plant: plant[req.params.id]
//     // })

//     Plant.findById(req.params.id), (error, plant) => {
//             res.render('show.ejs', {
//                 plant: plants
//         })
        
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

// set up EDIT route
router.get('/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (error, plant) => {
        res.render('edit.ejs', {
            plant: plant // plant
        })

    })
})

// // setting up PUT route
// app.put('/plant/:id', (req,res)=>{
  
//     //  this will replace the plant[id] to req.body
//     plant[req.params.id] = req.body;
  
//     // will send back to the the index page.
//     res.redirect('/plant')
  
//   })

// set up UPDATE route
// PUT /plant/:id -- updates the information on the server
// sometimes the HTTP method PATCH is used here instead
router.put('/:id', (req, res) => {
    
    Plant.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPlant) => {
        res.redirect('/plant')
    })
})

module.exports = router