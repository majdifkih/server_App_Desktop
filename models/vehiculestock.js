const mongoose = require('mongoose')
const vehiculeStockSchema = mongoose.Schema({
    vehicule : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'vehicule',
        required:true,
    },
    stock : [
        {products : {
            type : mongoose.Schema.Types.ObjectId,
            ref:'product',
            required:false,
            default:null,
        },
        quantity : {
            type : Number,
            required:false,
            default:0,
        },
        status : {
            type : String,
            required:false,
            default:'GOOD'
        }
    }
    ],
    
}
);
const VehiculeStock = mongoose.model('vehiculeStock' ,vehiculeStockSchema)
module.exports = VehiculeStock
