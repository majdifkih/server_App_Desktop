const express = require('express');
const router = express.Router()
const {Login,LoginD} = require('../Controllers/auth.controller.jsx')


//Login
router.post('/login',Login)
router.post('/loginD',LoginD)

//Resgister
// router.post('/register',Register)





  module.exports=router;