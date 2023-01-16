const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    barCode : {
        type : String,
        required:true,
        unique:true
    },
    productName: {
        type : String,
        required:true,
    },
    productQuantity  : {
        type : Number,
        required:true,
    },
    productPrice : {
        type : Number,
        required:true,
    },
    category : {
        type : String,
        required:true,
    },
    Quantityalert : {
        type : String,
        required:false,
    },
    status : {
        type : String,
        
    }
});   
productSchema.pre('save', function(next) {
    if (this.productQuantity >=this.alertCondition) {
      this.status = 'GOOD';
    } else {
      this.status = 'LOW';
    }
  
    next();
  });
const Product = mongoose.model('product' ,productSchema)
module.exports = Product





