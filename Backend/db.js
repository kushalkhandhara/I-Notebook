const mongoose = require('mongoose');


const mongoURI = "mongodb+srv://Add Your String/inotebook"

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
