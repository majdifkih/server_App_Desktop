const Delivery = require("../models/delivery");

const AddDelivery = async (req,res)=>{
    Delivery.collection.dropIndexes(function (err, results) {
        if (err) console.log(err);
        console.log(results);
        
    }); 
    console.log(req.body);
    let new_delivery = new Delivery(req.body);
  
    new_delivery.save((err,delivery)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
            
        }
       else{
           
        
       
    
        return res.status(200).json({
            success:"Delivery save effactué avec succes",
            delivery:delivery
        });}
});
  }

const FindDeliveryByVehicule = async (req,res,next)=>{
    Delivery.find({vehicule:req.query.id}).populate({path:'store', populate: 'positionStore'}).exec((err,delivery)=>{
        if (err){
            console.log(err)
            return res.status(400).json({
                error:err
            })
        }
        return res.status(200).json({
            success:true,
            delivery:delivery
        })
    }
    )
}
  const FindAllDelivery = async (req,res,next)=>{
    Delivery.find().populate({path:'store', populate: 'positionStore'}).populate('vehicule').exec((err,delivery)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:delivery

            
        });
    });
  }
  const DeleteDelivery = async (req,res)=>{
    Delivery.findOneAndDelete({_id:req.query.id},(err,delivery)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Delivery delete effactué avec succes"
        });
    });
  }
    const FindSingleDelivery = async (req, res) => {
        console.log(req.query.id);

        const data = await Delivery.findOne({ _id: req.query.id }).exec((err, delivery) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                existingPosts: delivery

                
            });
        });
    }
    const ConfirmDelivery = async (req,res)=>{
        Delivery.findOneAndUpdate({store:req.query.store},{$set:{status:'done'}},{new:true}).exec((err,delivery)=>{
            if(err){
                console.log(err);
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:true,
                existingPosts:delivery

            });
        }
        )
    }
    module.exports = {
        FindSingleDelivery,
        DeleteDelivery,
        FindAllDelivery,
        AddDelivery,
        FindDeliveryByVehicule,
        ConfirmDelivery
        }