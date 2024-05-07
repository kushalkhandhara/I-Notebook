const mongoose = require('mongoose');


const mongoURI = "mongodb+srv://kkhandhara:MLOPMrNjdytZHUFO@cluster0.rfdphc3.mongodb.net/inotebook"

const connectToMongo = ()=> {
    // mongoose.connect(mongoURI,()=>
    // {
    //     console.log("Connected To Mongo Succefuly")
    // })

    mongoose.connect(mongoURI).then(() => {
        console.log("Connected To Mongo Succefuly")
    })

}
module.exports = connectToMongo;