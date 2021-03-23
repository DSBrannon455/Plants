// const plant = [
//     {
//         name: 'Swiss Cheese Plant',
//         scientific: 'Monstera deliciosa',
//         propagation: 'cutting'
//     },
//     {
//         name: 'African Violet',
//         scientific: 'Streptocarpus saintpaulia',
//         propagation: 'cutting'
//     },
//     {
//         name: 'Spider Plant',
//         scientific: 'Chlorophytum comosum',
//         propagation: 'cutting'
//     }

// ]

// module.exports = plant

const mongoose = require('mongoose')
const Schema = mongoose.Schema //creating a shorthand for the mongoose Schema constructor

// create a schema
// this is going to define the shape of the documents in the collection
// https://mongoosejs.com/docs/guide.html

const plantSchema = new Schema({
    name: String,
    scientific: String,
    propagation: String
})

// Creating a Plant model: We need to convert our schema into a model -- will be stored in 'tweets' collection.
// Models are fancy constructors compliled from Schema definition
// An instance of a model is called a document
// Models are responsible for creating and reading documents from the underlying MongoDB database
// https://mongoosejs.com/docs/models.html
const Plant = mongoose.model('Plant', plantSchema)

// Export the model to make it accessible in 'app.js'
module.exports = Plant