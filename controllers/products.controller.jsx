const Product = require("../models/product")


const AddProduct = async (req,res)=>{
    Product.collection.dropIndexes(function (err, results) {
        if (err) console.log(err);
        console.log(results);
        
    }); 
    let new_product = new Product(req.body);
  
    new_product.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        return res.status(200).json({
            success:"Produit save effactué avec succes"
        });
    });
  }

const FindAllProducts = async (req,res)=>{
    Product.find().exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:product
        });
    });
  }


const DeleteProduct = async (req,res)=>{
    Product.findByIdAndRemove(req.query.id ).exec((err,deleteProduct)=>{
        if(err) return res.status(400).json({
            message:"Suppression incorrect",err
        });
  
        return res.json({
            message:"Supprimer Produit avec succes",deleteProduct
        });
  
        }
    )
  }

  const FindSinglProduct = async (req, res) => {
    try {
      const data = await Product.findOne({ _id: req.query.id });
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
  };
const UpdateProduct = async (req,res)=>{
    Product.findByIdAndUpdate(
        req.query.id,
        {
            $set:req.body
        },
        (err,product)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Mise a jour Produit avec succes"
            });
        }
        
    );
  }

module.exports = {
    AddProduct,
    FindAllProducts,
   DeleteProduct,
   UpdateProduct ,
   FindSinglProduct
}