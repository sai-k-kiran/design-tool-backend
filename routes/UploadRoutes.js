const UploadRoutes = require("express").Router();
const path = require('path');
const {Uploads} = require('../models')
const fs = require("fs");
const upload = require('../multer')
const mysql = require('mysql2')

UploadRoutes.post("/upload", upload.single('image'), (req, res, err) => {
	if(!req.file) {
		res.json({ msg: 'Only image files'})
	} else {
		let info = {
			userId: req.body.userId,
			type: 'image',
			name: req.file.filename
		}

		Uploads.create(info)
		.then(image => {
			res.json({ image })
		}).catch(err => {
			res.json({err})
			console.log(err)
		})
	}
})
 
UploadRoutes.post('/uploads', (req, res) => {
    const user_id = req.body.userId

	Uploads.findAll({
		where: { userId: user_id}
	}).then(images => {
		res.json({ images })
	}).catch(err => {
		res.json({err})
	})
})
UploadRoutes.post('/delete_uploaded', (req, res) => {
	const id = req.body.id
	Uploads.destroy({ where: {id: id}})
	.then(response => {
		res.json({response})
	}).catch(err => console.log(err))
})
module.exports = UploadRoutes