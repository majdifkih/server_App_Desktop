const express = require('express');
const router = express.Router()
const {AddSupplier,
    FindAllSuppliers,
    DeleteSupplier,
    UpdatePSupplier  } = require('../Controllers/suppliers.controller.jsx')

const {verifyAdmin} = require('../utils/verifyToken.js')

//ADD Supplier 
router.post('/suppliers',AddSupplier)

//GET ALL Suppliers
router.get('/suppliers',FindAllSuppliers)

//DELETE Supplier
router.delete('/suppliers',DeleteSupplier)

//UPDATE Supplier
router.put('/suppliers',UpdatePSupplier)



  module.exports=router;