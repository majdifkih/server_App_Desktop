const express = require('express');
const router = express.Router()
const {AddUser,
  FindSinglUser,
    FindAllUser,
    DeleteUser,
    UpdateUser  } = require('../Controllers/users.controller.jsx');
const { verifyAdmin } = require('../utils/verifyToken.js');

//ADD User 
router.post('/users',AddUser)

//GET ALL USERS
router.get('/users',FindAllUser)
//GET SINGLE USER
router.get('/single',FindSinglUser)

//DELETE USER
router.delete('/users',DeleteUser)

//UPDATE USER
router.put('/users',UpdateUser)



  module.exports=router;