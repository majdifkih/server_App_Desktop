const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({

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
    }
},{ timestamps: true });   
const Client = mongoose.model('client' ,clientSchema)
module.exports = Client





