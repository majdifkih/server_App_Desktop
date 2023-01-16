const { path } = require("express/lib/application");
const Position = require("../models/position");
const Vehicule = require("../models/vehicule")
const VehiculeSotck = require("../models/vehiculeStock");
const Countalert = async (req,res)=>{
    
    Vehicule.find({$or:[{alertOIL:true},{alertTIRES:true}]},(err,count)=>{
        if(err) return res.status(400).json({
            error:err
        });
        return res.status(200).json({
            success:true,
            count: count.length
        });
    }
    )
}

const AddVehicule = async (req,res)=>{
    Vehicule.collection.dropIndexes(function (err, results) {
        if (err) console.log(err);
        console.log(results);
        
    }); 
    let new_vehicule = new Vehicule(req.body);
  
    new_vehicule.save((err,vehicule)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
            
        }
       else{ 
    
        let id = vehicule._id;
        Pos=new Position({
            idvehicule:id,
            latitude:0,
            longitude:0
        })
        Pos.save((err,pos)=>{
            if(err){
                console.log(err);
                return res.status(400).json({
                    error:err
                    
                    });
                    }
                    else{
                        Van= new VehiculeSotck({
                            vehicule:id,
                            
                        })
                        Van.save()
                    }
               
        }); 
           
            
        
   


    
        return res.status(200).json({
            success:true
        });}
});
  }

const FindAllVehicules = async (req,res,next)=>{
    Vehicule.find().populate('Driver').exec((err,vehicule)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:vehicule

            
        });
    });
  }
 
  const FindSinglVehicule = async (req, res) => {
   
      const data = await Vehicule.findOne({ Driver: req.query.id }).exec((err, vehicule) => {
          if (err) {
              return res.status(400).json({
                  error: err
                  });
            }
            return res.status(201).json({
                success: true,
                vehicule: vehicule}
                );
        }
        );
    } 
 
    const Fixalert = async (req,res)=>{
        console.log(req.query.id);
        console.log(req.query.type);
        if (req.query.type == "OIL") {
        Vehicule.findOneAndUpdate({_id:req.query.id},{alertCountO:0,alertOIL:false},{new:true},(err,doc)=>{
            console.log(doc);
            console.log(err);
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:"Vehicule oil  alert fixe avec succes",
                vehicule : doc
            });
        }
        )}
        else if(req.query.type == "TIERS"){
            Vehicule.findOneAndUpdate({_id:req.query.id},{alertCountT:0,alertTIRES:false},{new:true},(err,doc)=>{
                if(err){
                    return res.status(400).json({
                        error:err
                    });
                }
                return res.status(200).json({
                    success:"Vehicule alert fixe avec succes",
                    vehicule : doc
                });
            }
            )}
            else if(req.query.type == "MAINTENANCE"){
                Vehicule.findOneAndUpdate({_id:req.query.id},{Maintenance:req.query.date},{new:true},(err,doc)=>{
                    if(err){
                        return res.status(400).json({
                            error:err
                        });
                    }
                    return res.status(200).json({

                        success:"Vehicule alert fixe avec succes",
                        vehicule : doc
                    });
                }
                )}

        else {
            return res.status(400).json({
                error:"type not found"
            });
        }
    }


    //  exec((err,data) => {
    //       if (err) {
    //           return res.status(400).json({
    //               error: err
    //               });
    //         }
    //         return res.status(200).json({
    //             success: true,
    //             data: data.Driver
        
    //         });})

const DeleteVehicule = async (req,res)=>{
  
    Vehicule.findByIdAndRemove(req.query.id ).exec((err,deleteVehicule)=>{
        if(err) return res.status(400).json({
            message:"Suppression incorrect",err
        });
  
        return res.json({
            message:"Supprimer avec succes",deleteVehicule
        });
  
        }
    )
  }


const UpdateVehicule = async (req,res)=>{
    console.log(req.body);
    const _id =req.query.id
    // const _id = req.params.ID;
    console.log(_id);
    try {

        const result = await Vehicule.findByIdAndUpdate(_id,req.body,{new: true});
        console.log(result)
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Vehicule not Update....",
                data: result
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Vehicule is Updated successfully...",
                data: result
            })
        }
    }
    catch (e) {
        res.send(e)
    }
//   try {
//     const data = await Vehicule.findOneAndUpdate(
//         { _id: req.params.ID },
//         {
//             $set:req.body
//         },
//         { new: true },
//         res.status(201).json(data)
//       );
//   } catch (error) {
//       return res.status(400).json({
//           error:error.message
//       })
//   }
      
  }
  const Distance = async (req,res,next)=>{
    let tab=req.params.info
    var data = tab.split('||');
    let id =data[0]
    let latitude =data[1]
    let longitude =data[2]
    console.log(latitude)
    console.log(longitude)
    // let vehicule = await Vehicule.findById(id);
               let lonB= Position.find({idvehicule:id},{longitude:1,_id:0,latitude:1}).exec((err,data)=>{
                   console.log(data[0].latitude,"latitude")
                   if (data[0].latitude==0 || data[0].longitude==0){
                    Position.findOneAndUpdate({idvehicule:id},{latitude:latitude,longitude:longitude},{new:true}).exec((err,position)=>{
                        if(err) return res.status(400).json({
                            error:err
                        });
                        return res.status(200).json({
                            success:true,
                            existingPosts:position
                        });
                    })
                   }
                       
                   
               
               
            // console.log("data",data[0].longitude);
          
            else{
                Fdistance(data[0].latitude, latitude, data[0].longitude, longitude);
                function Fdistance(latB, latitude, lonB, longitude) {
                    var R = 6371; // Radius of the earth in km
                    console.log("latB",latB);
                    console.log("latitude",latitude);
                    console.log("lonB",lonB);
                    console.log("longitude",longitude);
                    lon1 =  lonB * Math.PI / 180;
                    lon2 = longitude * Math.PI / 180;
                    lat1 = latB * Math.PI / 180;
                    lat2 = latitude * Math.PI / 180;
                    var dLat = (lat2 - lat1); // deg2rad below
                    var dLon = (lon2 - lon1);
                    console.log("dLat", dLat);
                    console.log("dLon",dLon);
                    console.log("lat1",lat1);
                    console.log("lat",lat2);
                    console.log("lon1",lon1);
                    console.log("lon2",lon2);
                    var a =
                        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(lat1) *
                            Math.cos(lat2) *
                            Math.sin(dLon / 2) *
                            Math.sin(dLon / 2);
                            console.log("a",a);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    console.log("c",c)
                    var d = (R * c).toFixed(); // Distance in km
                    console.log("D",d)

                    if (d < 1) {
                        next();
                    }
                    else {
                        
                        Vehicule.findOneAndUpdate({_id:id},{$inc: { Mileage: d ,alertCountT: d ,alertCountO: d,hours:5 }},{new:true}).exec((err,vehicule)=>{
                            if(err) return res.status(400).json({
                                error:err
                            });
                            let info= Vehicule.find({_id:id},{Mileage:1,alertCountT:1,alertCountO:1}).exec((err,vehicule)=>{
                            console.log(vehicule,"vehicule")
                           
                                vehicule[0].alertCountT >=100000 ? Vehicule.findOneAndUpdate({_id:id},{alertTIRES:true},{new:true}).exec((err,vehicule)=>{
                                    if(err) return res.status(400).json({
                                        error:err
                                    });
                                    return res.status(200).json({
                                        success:true,
                                        existingPosts:vehicule
                                    });
                                }

                                ): next();

                                vehicule[0].alertCountO >=1000 ? Vehicule.findOneAndUpdate({_id:id},{alertOIL:true},{new:true}).exec((err,vehicule)=>{
                                    if(err) return console.log(err);
                                    return console.log(vehicule);

                                }
                                ): next();
                            })
                                    
                                    
                                    


                            return vehicule 
                                
                        }
                        )
                        Position.findOneAndUpdate({idVehicule:id},{latitude:latitude,longitude:longitude},{new:true}).exec((err,position)=>{
                            if(err) return err;
                            return position;
                        }
                        )
                    };
                }
            }})
    // let distance = await vehicule.distanceFrom(latitude,longitude);
    
}     
 
      

    // Vehicule.findByIdAndUpdate(
    //     req.params.ID,
    //     {
    //         $set:req.body
    //     },
    //     (err,vehicule)=>{
    //         if(err){
    //             return res.status(400).json({error:err});
    //         }
    //         return res.status(200).json({
    //             success:"Mise a jour Vehicule avec succes"
    //         });
    //     }
        
    // );
  

module.exports = {
AddVehicule,
FindAllVehicules,
DeleteVehicule,
UpdateVehicule,
FindSinglVehicule,
Distance,
Countalert,
Fixalert
}