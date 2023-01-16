const mongoose = require('mongoose')

const supplierSchema = mongoose.Schema({
  
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
        default:"Online" },

    productCategory : {
        type : String,
        required:true,
    },
    address : {
        type : String,
        required:true,
    }
     
},{ timestamps: true });   
const Supplier = mongoose.model('supplier' ,supplierSchema)
module.exports = Supplier





