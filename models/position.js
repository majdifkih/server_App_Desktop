const timespan = require('jsonwebtoken/lib/timespan')
const mongoose = require('mongoose')

const positionSchema = new mongoose.Schema({
   idvehicule : {
         type : mongoose.Schema.Types.ObjectId,
            ref:'Vehicule',
            required:true,
        },

      latitude:{
        type:String,
        required:true,
       
    },
    longitude:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:false,

        
    },
    time:{
        type:String,
        required:false
    },
   
},{ timestamps: true }
);
const Position = mongoose.model('position' ,positionSchema)
module.exports = Position
 
