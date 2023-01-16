const express = require('express');
const router = express.Router()
const {UpdateVan ,FindOneVan,DeleteProduct } = require('../Controllers/vans.controller.jsx')

router.get('/vans',FindOneVan)
router.put('/vans',UpdateVan)
router.delete('/vans',DeleteProduct)

module.exports=router;