let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');
 
const awsWorker = require('./../controller/aws.controller');
 
router.post('/upload', upload.single("file"), awsWorker.doUpload);
 
module.exports = router;