const express = require('express');
const router = express.Router()
const {AddClient,
    FindAllClients,
    DeleteClient,
    UpdateClient,
    FindSinglClient  } = require('../Controllers/clients.controller.jsx')

//ADD CLIENT 
router.post('/clients',AddClient)

//GET ALL CLIENTS
router.get('/clients',FindAllClients)
//GET SINGLE CLIENT

//GET SINGLE CLIENT
router.get("/single",FindSinglClient)
//DELETE CLIENT
router.delete('/clients',DeleteClient)

//UPDATE clients
router.put('/clients',UpdateClient)



  module.exports=router;