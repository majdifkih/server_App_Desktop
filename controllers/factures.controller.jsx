const Facture = require('../models/facture');
const VehiculeSotck = require('../models/vehiculeStock');

const AddFacture = async (req,res,next)=>{
    Facture.collection.dropIndexes(function (err, results) {
        if (err) console.log(err);
        console.log(results);
        
    });    let new_facture = new Facture(req.body);
    new_facture.save((err,facture)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
            next();
        }
        facture.stock.map((product)=>{
            console.log(product.products);
            console.log(product.quantity);

            VehiculeSotck.findOneAndUpdate({vehicule:req.body.vehicule,"stock.products":product.products},{$inc:{"stock.$.quantity":-product.quantity}},{new:true}).exec((err,stock)=>{
             
            })

        })
        // VehiculeSotck.findOneAndUpdate({vehicule:req.body.vehicule,"stock.products._id":req.body.stock},{$inc:{quantity: -req.body.stock.quantity}},{new:true}).exec((err,product)=>{
        //     if(err){
        //         console.log(err);
        //         return res.status(400).json({
        //             error:err
        //         })
        //     }

        // }
        // )
        return res.status(200).json({
            success:"Facture save effactué avec succes",
            invoice:facture
        });
        
    });
  } 

  const FindFactures = async (req,res,next)=>{
      if (req.query.type==='One'){
          Facture.findOne({_id:req.query.id}).populate('store').populate("stock.products").exec((err,fac)=>{
              if (err){
                  console.log(err)
                  return res.status(400).json({
                      error:err
                  })
              }
              return res.status(200).json({
                  success:true,
                  facture:fac
              })
          }
          )
      }
      else if (req.query.type==='vehicule'){ 
    Facture.find({vehicule:req.query.id}).populate('store').exec((err,facture)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:facture

        });
    })}
    else if (req.query.type==='store'){
        Facture.find({store:req.query.id}).populate('store').exec((err,facture)=>{
            if(err){
                console.log(err);
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:true,
                existingPosts:facture

            });
        }
        )
    }
else{
    Facture.find().populate('store').populate("stock.products").exec((err,facture)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:facture

        });
    }
    )
}

}


    const changeStatus = async (req,res,next)=>{
        Facture.findOneAndUpdate({_id:req.query.id},{$set:{status:'paid'}},{new:true}).exec((err,fact)=>{
            if(err){
                console.log(err);
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:true,
                existingPosts:fact
    
            });
        })
    }
  module.exports = {
    AddFacture,
    FindFactures,
    changeStatus
    // FindAllFactures,
    // DeleteFacture,
    // FindSingleFacture
    }