const mongoose  = require('mongoose')
const orderSchema = mongoose.Schema({
    date:{
        type:Date,
        required:false,
        default:Date.now
    },
    name : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'client',
        required:true,
    },
    // store : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref:'Store',
    //     required:false,
    // },
    stock : [
        {products : {
            type : mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:true,
        },
        quantity : {
            type : Number,
            required:true,
        },
    }
    ],
    total : {
        type : Number,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default:'Processing'  
    }
},{ timestamps: true }
);
const Order = mongoose.model('order' ,orderSchema)
module.exports = Order
