const express = require('express');
const router = express.Router()
const {FindPositions,Heures} = require('../Controllers/positions.controller.jsx')

// //Login
router.get('/positions',FindPositions)
router.get('/heures',Heures)







  module.exports=router;