const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({

    name : 
    {
        type : String,
        required : [true, "name is requird"]
    },
    email : 
    {
        type : String,
        required : true,
        unique : true
    },
    password : 
    {
        type : String,
        required : true
    },
    date : 
    {
        type : Date,
        // required : true
        default : Date.now
    }

  });


  const User  = mongoose.model('user',UserSchema);
//   User.createIndexes();
  //Creates a unique index on a table. Duplicate values are not allowed:
  module.exports = User;