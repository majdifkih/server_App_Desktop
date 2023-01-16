const Store = require("../models/store")


const AddStore = async (req,res)=>{
    Store.collection.dropIndexes(function (err, results) {
        if (err) console.log(err);
        console.log(results);
        
    }); 
    let new_store = new Store(req.body);
  
    new_store.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        return res.status(200).json({
            success:"store save effactué avec succes"
        });
    });
  }
  const FindSinglStore = async (req, res) => {
    try {
        Store.findOne({ _id: req.query.id }).populate('positionStore').exec((err, store)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:true,
                existingPositions:store
            });
        }
        )
    } catch (error) {
      console.log(error.message);
    }
  };
const FindAllStores = async (req,res)=>{
    
    Store.find().populate('positionStore').exec((err,store)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:store
        });
    });
    
  }
const DeleteStores = async (req,res)=>{

    Store.findByIdAndRemove(req.query.id ).exec((err,deleteStore)=>{
        if(err) return res.status(400).json({
            message:"Suppression incorrect",err
        });
  
        return res.json({
            message:"Supprimer Store avec succes",deleteStore
        });
  
        }
    )
  }

const UpdateStores = async (req,res)=>{



    try {
        const _id =req.query.id
        const result = await Store.findByIdAndUpdate(_id,req.body);
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
//  await   Store.findOneAndUpdate(

//      {_id:req.params.ID},
//         {
//             $set:req.body
//         },
        
//         (err,store)=>{
//             if(err){
//                 return res.status(400).json({error:err});
//             }
//             return res.status(200).json({
//                 success:"Mise a jour Store avec succes"+store,
             
//             });
//         }
        
//     ).clone();
  }

module.exports = {
    AddStore,
   FindAllStores,
   DeleteStores,
   UpdateStores,
   FindSinglStore 
}