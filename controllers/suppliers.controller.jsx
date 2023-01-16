const Supplier = require("../models/Supplier")


const AddSupplier = async (req,res)=>{
    Supplier.collection.dropIndexes(function (err, results) {
        if (err) console.log(err);
        console.log(results);
        
    }); 
    let new_supplier = new Supplier(req.body);
  
    new_supplier.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        return res.status(200).json({
            success:"Fournisseur save effactué avec succes"
        });
    });
  }

const FindAllSuppliers = async (req,res)=>{
    Supplier.find().exec((err,supplier)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:supplier
        });
    });
  }


const DeleteSupplier = async (req,res)=>{
    Supplier.findByIdAndRemove(req.query.id ).exec((err,deleteSupplier)=>{
        if(err) return res.status(400).json({
            message:"Suppression incorrect",err
        });
  
        return res.json({
            message:"Supprimer Fournisseur avec succes",deleteSupplier
        });
  
        }
    )
  }


const UpdatePSupplier = async (req,res)=>{
    Supplier.findByIdAndUpdate(
        req.query.id,
        {
            $set:req.body
        },
        (err,supplier)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Mise a jour Fournisseur avec succes"
            });
        }
        
    );
  }

module.exports = {
AddSupplier,
FindAllSuppliers,
DeleteSupplier,
UpdatePSupplier 
}