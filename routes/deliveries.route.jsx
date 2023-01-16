const express = require('express');
const router = express.Router()
const {AddDelivery,
    FindAllDelivery,
    DeleteDelivery,
    FindSingleDelivery ,FindDeliveryByVehicule,ConfirmDelivery } = require('../Controllers/deliveries.controller.jsx')

//ADD CLIENT 
router.post('/deliveries',AddDelivery)

//GET ALL CLIENTS
router.get('/deliveries',FindAllDelivery)

//DELETE CLIENT
router.delete('/deliveries',DeleteDelivery)

//UPDATE CLIENT
router.get('/single',FindSingleDelivery)

router.get('/vehicule',FindDeliveryByVehicule)
 router.get('/delivery/confirm',ConfirmDelivery)



  module.exports=router;