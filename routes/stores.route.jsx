const express = require('express');
const router = express.Router()
const {  AddStore,
  FindAllStores,
  DeleteStores,
  UpdateStores,FindSinglStore  } = require('../Controllers/stores.controller.jsx');

//ADD stores 
router.post('/stores', AddStore)

//GET ALL stores
router.get('/stores',FindAllStores)
//GET SINGLE stores
router.get("/single",FindSinglStore)

//DELETE stores
router.delete('/stores',DeleteStores)

//UPDATE stores
router.put('/stores',UpdateStores)



  module.exports=router;