const mongoose = require('mongoose')


const url = `mongodb+srv://nuuttiturunen:uupUeXpfnOgCH0Lh@cluster0.szliy4a.mongodb.net/testi?retryWrites=true&w=majority`
console.log('connecting to ', url)


mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const resSchema = new mongoose.Schema({
    work1_name: String,
    work2_name: String,
    work3_name: String,
},
    { strict: false })

resSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Work_Type = mongoose.model('Work_Type', resSchema);
module.exports = Work_Type;