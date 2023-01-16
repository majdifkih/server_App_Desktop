const Client = require("../models/client")



const AddClient = async (req,res)=>{
    Client.collection.dropIndexes(function (err, results) {
        if (err) console.log(err);
        console.log(results);
        
    });    let new_client = new Client(req.body);
    new_client.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        return res.status(200).json({
            success:"client save effactué avec succes"
        });
    });
  }

const FindAllClients = async (req,res)=>{
    Client.find().exec((err,Client)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:Client
        });
    });
  }


const DeleteClient = async (req,res)=>{
    Client.findByIdAndRemove(req.query.id ).exec((err,deletedClient)=>{
        if(err) return res.status(400).json({
            message:"Suppression incorrect",err
        });
  
        return res.json({
            message:"Supprimer avec succes",deletedClient
        });
  
        }
    )
  }
  const FindSinglClient = async (req, res) => {
    try {
      const data = await Client.findOne({ _id: req.query.id });
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
  };

const UpdateClient = async (req,res)=>{
    Client.findByIdAndUpdate(
        req.query.id,
        {
            $set:req.body
        },
        (err,client)=>{
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
    AddClient,
    FindAllClients,
    DeleteClient,
    UpdateClient,
    FindSinglClient
}