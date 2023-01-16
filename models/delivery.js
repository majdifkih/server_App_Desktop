const { status } = require('express/lib/response');
const mongoose = require('mongoose')
const deliverySchema = mongoose.Schema({
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
    vehicule : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'vehicule',
        required:true,
    },
    status : {
        type:String,
        required:false,
        default:'undone'
    }

},{ timestamps: true }
);
const Delivery = mongoose.model('delivery' ,deliverySchema)
module.exports = Delivery
