const bcrypt = require("bcrypt");
const Driver = require("../models/Driver")



const AddDriver = async (req,res)=>{
    Driver.collection.dropIndexes(function (err, results) {
        if (err) console.log(err);
        console.log(results);
        
    }); 
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)
        let new_driver = new Driver({
        email:req.body.email,
        name:req.body.name ,
        telf:req.body.telf ,
        address:req.body.address,
        password:hashedPassword
        });
        new_driver.save((err)=>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            return res.status(200).json({
                success:"Driver save effactué avec succes"
            });
        })
      
       
    
    
    
   
  }

const FindAllDrivers = async (req,res)=>{
    Driver.find().exec((err,driver)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:driver
        });
    });
  }


const DeleteDriver = async (req,res)=>{
    Driver.findByIdAndRemove(req.query.id ).exec((err,deleteDriver)=>{
        if(err) return res.status(400).json({
            message:"Suppression incorrect",err
        });
  
        return res.json({
            message:"Supprimer avec succes",deleteDriver
        });
  
        }
    )
  }


const UpdateDriver = async (req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    Driver.findByIdAndUpdate(
        req.query.id,
        {
            $set:{"email":req.body.email,
                "name":req.body.name ,
                "telf":req.body.telf ,
                "address":req.body.address,
                "idDriver":req.body.idDriver,
                "password":hashedPassword}
        },
        (err,driver)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Mise a jour avec succes"
            });
        }
        
    );
  }

module.exports = {
    AddDriver,
   FindAllDrivers,
   DeleteDriver,
   UpdateDriver 
}