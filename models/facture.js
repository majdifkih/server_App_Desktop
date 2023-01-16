const mongoose = require('mongoose')


const factureSchema = mongoose.Schema({
    date:{
        type:Date,
        required:false,
        default:Date.now
    
    },
    store : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'store',
        required:true,
    },
    stock : [
        {products : {
            type : mongoose.Schema.Types.ObjectId,
            ref:'product',
            required:true,
        },
        quantity : {
            type : Number,
            required:true,
        },
    }
    ],
    status:{
        type:String,
        required:false,
        default:'unpaid'
    },
    vehicule : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'vehicule',
        required:true,
    },
    total:{
type:Number,
required:false,
default:0

    }
},{ timestamps: true }
);
const Facture = mongoose.model('facture' ,factureSchema)
module.exports = Facture
