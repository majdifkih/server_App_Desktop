const express = require('express');
const router = express.Router()
const {AddProduct,
    FindAllProducts,
    UpdateProduct,
    DeleteProduct,
    FindSinglProduct  } = require('../Controllers/products.controller.jsx')

//ADD Product 
router.post('/products',AddProduct)

//GET ALL Products
router.get('/products',FindAllProducts)
//GET SINGLE Product
router.get("/single",FindSinglProduct)

//DELETE Product
router.delete('/products',DeleteProduct)

//UPDATE Product
router.put('/products',UpdateProduct)



  module.exports=router;