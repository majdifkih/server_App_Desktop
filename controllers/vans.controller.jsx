const VehiculeStock = require('../models/vehiculeStock');
const Product = require('../models/product');



const UpdateVan = async (req,res,next)=>{
    console.log(req.body)
    VehiculeStock.findOneAndUpdate({vehicule:req.query.id},{ $push : {"stock":req.body}},{new:true}).exec((err,van)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                error:err
            })

            
            ;}
            // VehiculeSotck.findOneAndUpdate({vehicule:"62b500f9095a833c29bb320b","stock.products":product.products},{$inc:{"stock.$.quantity":-product.quantity}},{new:true}).exec((err,stock)=>{
             
            // })
            
 Product.findOneAndUpdate({_id:req.body.products},{$inc:{productQuantity: -req.body.quantity}},{new:true}).exec((err,product)=>{
    console.log(req.body.products,"product")
    // console.log(product,"product returned")
    console.log(req.body.quantity,"quantity")
            if(err){
                console.log(err);
                return res.status(400).json({
                    error:err
                })
            }

        }
        )
        
        return res.status(200).json({
            success:true,
            van:van
        });
        
        })


    
}
const FindOneVan = async (req,res,next)=>{
    VehiculeStock.find({vehicule:req.query.id}).populate('stock.products').exec((err,vans)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:vans

        });
    }
    );
}
 
const DeleteProduct = async (req,res,next)=>{
    VehiculeStock.findOneAndUpdate({vehicule:req.query.id},{$pull:{stock:{_id:req.query.pd}}},{new:true}).exec((err,van)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                error:err
            });}
        return res.status(200).json({
            success:true,
            van:van
        });
        
        }
    )}


module.exports = {
    UpdateVan,
    FindOneVan,
    DeleteProduct
}
