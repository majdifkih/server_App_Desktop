const User = require("../models/User")
const Driver = require("../models/Driver")
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const { createError } =require("../utils/error");
const Vehicule = require("../models/vehicule");


 const Login = async (req, res, next) => {
   try {
     const user = await User.findOne({ email: req.body.email });
     console.log(user);
     if (!user) return next(createError(404, "User not found!"));
 
     const isPasswordCorrect = await bcrypt.compare(
       req.body.password,
       user.password
     );
     if (!isPasswordCorrect)
       return next(createError(400, "Wrong password or username!"));
 
     const token = jwt.sign(
       { id: user._id, isAdmin: user.isAdmin },
       "SECRET"
     );
 
     const { isAdmin,password,  ...otherDetails } = user._doc;
     res
       .cookie("access_token", token, {
         httpOnly: true,
       })
       .status(200)
       .json({success:"success" ,details: { ...otherDetails }, isAdmin,token });
   } catch (err) {
     next(err);
   }
 };
// const Login = async (req,res)=>{
//     let email = req.body.email;
//     let password = req.body.password;

 
//     if(email=="" || password=="") {
//        res.json({
//           status:"Failed",
//           message:"Empty login"
 
 
//        })
//     }else {
       
//        User.find({email:email}).then(data => {
//           if(data) {
//              bcrypt.compare(req.body.password, data[0].password,function(err, result) {
 
//                 if (result) {
//                    let token = jwt.sign({name:data[0].Name,
//                                           id:data[0]._id,
//                                        Role:data[0].isAdmin},process.env.JWTKEY, {expiresIn:'30d'})
//                   const {password,isAdmin, ...rest} = data;
//                    res.json({
 
//                       status:"success",
//                       message:"Signup Successful",
//                       data:{...rest},
//                       token
                
 
//                    })
//                 }else{
//                    res.json({
//                       status:"Failed",
//                       message:"Invalid login",
//                       err,
//                       data
//                    })
//                    console.log(err)
//                 }
//              })
 
//           }
 
 
//        })
 
 
 
//     }
 
//   }
const LoginD = async (req, res, next) => {
  try {
    const driver = await Driver.findOne({ email: req.body.email });
    console.log(driver);
    if (!driver) return next(res.status(404).json({
      message: "Driver not found!"
      }));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      driver.password
    );
    if (!isPasswordCorrect)
      return next(res.status(404).json({
        message: "Wrong Password!"
        }));

    const token = jwt.sign(
      { id: driver._id, isAdmin: driver.isAdmin },
      "SECRET"
    );
// const id= Vehicule.findOne({Driver:driver._id}).select('Driver').exec((err,data)=>{
//   if(err){
//     return res.status(400).json({
//       error:err
//     });
//   }
//   if(data){
//     return res.status(200).json({
//       success:true,
//       data:data
//     });
//     console.log(data)
//   }
// }
// )
// console.log(id)
    const { isAdmin,password,  ...otherDetails } = driver._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({success:"success" ,details: { ...otherDetails }, isAdmin,token });
  } catch (err) {
    next(err);
  }
};

const Register = async (req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    let new_user = new User({
        email: req.body.email,
        nom: req.body.nom,
        telf: req.body.telf,
        status: req.body.status,
        address: req.body.address,
        role: req.body.role,
        password: hashedPassword
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

module.exports = {
    Login,
    Register,
    LoginD
}