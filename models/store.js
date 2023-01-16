const mongoose = require('mongoose')

const storeSchema = mongoose.Schema({
    
    contact:{
        type : String,
        required:true,
    },
    name : {
        type : String,
        required:true,
        
    },
    type : {
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
        required:false,
    },
    owner : {
        type : String,
        required:true,
    },
    positionStore : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'position',}

},{ timestamps: true });   
const Store = mongoose.model('store' ,storeSchema)
module.exports = Store





