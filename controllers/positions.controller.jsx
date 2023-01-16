const Position = require('../models/position');
const FindPositions = async (req,res)=>{
    Position.findOne({ idvehicule: req.query.id }).select({latitude:1, longitude:1,_id:1}).exec((err, position)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPositions:position
        });
    }
    )
}

const Heures = async (req,res)=>{
    Position.find({ idvehicule: req.query.id }).exec((err, position)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPositions:position
        });
    }
    )
}

module.exports = {
    FindPositions,
    Heures
    }