const express = require('express');
const router = express.Router()
const {AddOrder,
    FindAllOrders,
    DeleteOrder,
    UpdateOrder  } = require('../Controllers/orders.controller.jsx')

//ADD ORDER 
router.post('/orders',AddOrder)

//GET ALL Orders
router.get('/orders',FindAllOrders)

//DELETE Order
router.delete('/orders',DeleteOrder)

//UPDATE Order
router.put('/orders',UpdateOrder)



  module.exports=router;