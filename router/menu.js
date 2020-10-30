const express = require('express');
const router = express.Router();
const menuController = require('./../controller/menu');

router.post('/', menuController.createItem);
router.get('/', menuController.GetAll);
 
module.exports = router;