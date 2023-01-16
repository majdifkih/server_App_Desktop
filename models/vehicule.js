const mongoose = require('mongoose');

const vehiculeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true
    },
    Matricule:{
        type:String,
        required:true,
        
    },
   
    Maintenance :{
        type:Date,
        required:true,
    },
     Mileage:{
         type:Number,
         required:false,
         default:0,
     },
    alertOIL:{
        type: Boolean,
          default: false,
          required: false,

    },
    hours:{
        type:Number,
        required:false,
        default:0,
    }
    ,
    alertCountO:{
        type: Number,
        required:false,
        default:0,
    },
    alertCountT:{
        type: Number,
        required:false,
        default:0,
    },
    alertTIRES:{
        type: Boolean,
            default: false,
            required:false,
    },
      Category:{
        type:String,
        required:true
    },
    Driver:{
     type:mongoose.Schema.Types.ObjectId,
        ref:'driver',
        required:true,
    },
// positions:{
//     type:mongoose.Schema.Types.ObjectId,    
//     ref:'Position'}

},{ timestamps: true }
);

// vehiculeSchema.pre('save', function(next) {
//     if (this.Mileage >= 5000) {
//       this.changeOIL = true;
//     } else {
//       this.changeOIL = false;
//     }
//   if (this.Mileage >= 50000) {
//     this.changeTIRES = true;
//     } else {
//         this.changeTIRES = false;
//     }

//     next();
//   });
 const Vehicule= mongoose.model('vehicule',vehiculeSchema)
  module.exports = Vehicule