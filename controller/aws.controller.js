var stream = require('stream');
const s3 = require('../config/s3.config');
const skey = require('../config/s3.env');
const uuid = require('uuidv4');

exports.doUpload = (req, res) => {
	const s3Client = s3.s3Client;
	const params = s3.uploadParams;
	
	//originalname = originalname + Date.now() + originalname;
	params.Key = Date.now() + req.file.originalname;
	params.Body = req.file.buffer;
		
	s3Client.upload(params, (err, data) => {
		if (err) {
			res.status(500).json({error:"Error -> " + err});
		}
		res.status(201).json({
			status: "success",
			message: Date.now() + req.file.originalname
		 });
	});
}