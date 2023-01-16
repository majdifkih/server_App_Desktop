const express = require('express');
const router = express.Router()
const {AddFacture ,FindFactures,changeStatus } = require('../Controllers/factures.controller.jsx')


router.post('/factures',AddFacture)
router.get('/factures',FindFactures)
router.get('/fstatus',changeStatus)

module.exports=router;
