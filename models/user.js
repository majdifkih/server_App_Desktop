const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required:true,
       
    },
    name : {
        type : String,
        required:true,
    },
    telf : {
        type : String,
        required:true,
    },
    address : {
        type : String,
        required:true,
    },
  
    password:{
        type:String,
        required:true},
        
        role:{
            type:String,
            required:false,
            default:"responsable"
        }
    
},{ timestamps: true });   
const User = mongoose.model('user' ,userSchema)
module.exports = User





