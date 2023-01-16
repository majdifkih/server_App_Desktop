const express = require('express');
const router = express.Router()
const {AddDriver,
    FindAllDrivers,
    DeleteDriver,
    UpdateDriver  } = require('../Controllers/drivers.controller.jsx')

//ADD CLIENT 
router.post('/drivers',AddDriver)

//GET ALL CLIENTS
router.get('/drivers',FindAllDrivers)

//DELETE CLIENT
router.delete('/drivers',DeleteDriver)

//UPDATE CLIENT
router.put('/drivers',UpdateDriver)



  module.exports=router;