const mongoose = require('mongoose')

const driverSchema = mongoose.Schema({
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
    status : {
        type : String,
        required:false,
        default:'NonReg'
    },
    address : {
        type : String,
        required:true,
    },
  
    password:{
        type:String,
        required:true}
},{ timestamps: true });   
const Driver = mongoose.model('driver' ,driverSchema)
module.exports = Driver





