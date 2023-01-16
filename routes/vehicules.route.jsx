const express = require('express');
const router = express.Router()
const {AddVehicule,
    FindAllVehicules,
    DeleteVehicule,
    UpdateVehicule,  
    FindSinglVehicule,Distance,Countalert,Fixalert} = require('../Controllers/vehicules.controller.jsx')
    const {verifyAdmin} = require('../utils/verifyToken.js')

//ADD Vehicule 
router.post('/vehicules',AddVehicule)
router.get('/alerts',Fixalert)
router.get('/count',Countalert)
//GET ALL VehiculeS
router.get('/vehicules',FindAllVehicules)
//GET SINGLE Vehicule
router.get("/single",FindSinglVehicule)
//DELETE Vehicule
router.delete('/vehicules',DeleteVehicule)
router.get('/vehicules/:info',Distance)


//UPDATE Vehicule
router.put('/vehicules',UpdateVehicule)



  module.exports=router;