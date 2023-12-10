const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Work_Type = require('./models/work_type');
const cors = require('cors');
const {Mongoose} = require("mongoose");
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json())

/* CORS ongelman korjaamiseen */
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
})
;
 */


// mongodb+srv://nuuttiturunen:uupUeXpfnOgCH0Lh@cluster0.szliy4a.mongodb.net/testi?retryWrites=true&w=majority

const connectDB = async () => {
    mongoose.connect('mongodb+srv://nuuttiturunen:uupUeXpfnOgCH0Lh@cluster0.szliy4a.mongodb.net/testi?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
connectDB().then( () => {
    console.log('DB Connected!');
})
    .catch( (err) => {
        console.log(err);
    });


app.use("/", require("./routes/router"));
app.get('/work_types', (request, response) => {
    Work_Type.find({}).then(work_types => {
        response.json(work_types)
    })
})
app.post('/work_types', async (request, response) => {
    const body = request.body


    // await Mongoose.model("work_types").updateMany({}, {$set: {newField: ''}})


    // Tallennettavan rivin "konstruktori"
    const work_type = new Work_Type({
        work1_name: request.body.work1_name,
        work2_name: request.body.work2_name,
        work3_name: request.body.work3_name
    })

    // Tallennus tietokantaan
    work_type.save().then(savedWork_type => {
        console.log('saved to db')
        response.json(savedWork_type)
    })
})

app.post("/updateWork", async(req,rest) => {
    const{id, work1_name, work2_name, work3_name} = req.body;
    try{
        await Work_Type.updateOne({_id:id},{
            $set: {
                work1_name: work1_name,
                work2_name: work2_name,
                work3_name: work3_name
            }
        })
    } catch (error){
        console.log(error)
    }
})

app.patch('/work_types/:id', (request, response, next) => {
    const body = request.body
    console.log('patch req: ', body)
    const note = {
        thumbsUp: []
    }

    Work_Type.findByIdAndUpdate(request.params.id, note)
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

app.delete('/work_types/:id', (request, response, next) => {
    Work_Type.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post("/deleteWork", async (req,res) => {
    const{id}=req.body;
    try {
        Work_Type.deleteOne(
            {_id:id}
        )
    }
    catch (error){
        console.log(error)
    }
})

app.post("/addColumn", async (req,res) => {
    console.log(req.body.id);
    await Mongoose.model("work_types").updateMany({_id :req.body.id }, {$set: {newField: 'homo'}},
        { multi: true })
        .then(() => console.log('User updated'))
        .then(() => alert('User updated'))
        .catch((err) => console.log(err))
})



const PORT = process.env.PORT || 3001; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});