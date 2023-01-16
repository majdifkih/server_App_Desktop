const User = require("../models/User")
const bcrypt = require("bcrypt");



const AddUser = async (req,res)=>{
    User.collection.dropIndexes(function (err, results) {
        if (err) console.log(err);
        console.log(results);
        
    }); 
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)
        let new_user = new User({
        email:req.body.email,
        name:req.body.name ,
        telf:req.body.telf ,
        address:req.body.address,
        idUser:req.body.idUser,
        password:hashedPassword
        });
        new_user.save((err)=>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            return res.status(200).json({
                success:"user save effactué avec succes"
            });
        })
      
       
    
    
    
   
  }

  const FindSinglUser = async (req, res) => {
    try {
      const data = await User.findOne({ _id: req.query.id });
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
  };

const FindAllUser = async (req,res)=>{
    User.find().exec((err,User)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:User
        });
    });
  }


const DeleteUser = async (req,res)=>{
    User.findByIdAndRemove(req.query.id ).exec((err,DeletedUser)=>{
        if(err) return res.status(400).json({
            message:"Suppression incorrect",err
        });
  
        return res.json({
            message:"Supprimer avec succes",DeletedUser
        });
  
        }
    )
  }


  const UpdateUser = async (req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    User.findByIdAndUpdate(
        req.query.id,
        {
            $set:{"email":req.body.email,
                "name":req.body.name ,
                "telf":req.body.telf ,
                "address":req.body.address,
                "idUser":req.body.idUser,
                "password":hashedPassword}
        },
        (err,user)=>{
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
    AddUser,
    FindAllUser,
    DeleteUser,
    UpdateUser,
    FindSinglUser
}