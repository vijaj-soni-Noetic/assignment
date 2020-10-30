const express = require('express');
const router = express.Router();
const cardController = require('./../controller/card');

router.post('/', cardController.Create);
router.get('/', cardController.Get);
 
module.exports = router;