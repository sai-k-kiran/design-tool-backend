const express = require('express')
const TemplateRoutes = express.Router()
const {Templates} = require('../models')
const multer = require('multer');
const path = require('path');
const fs = require("fs");

const thumbs = multer.diskStorage({   
   destination: function(req, file, cb) { 
      cb(null, "./Thumbnails");
   }, 
   filename: function (req, file, cb) { 
      cb(null , `${Date.now()}-${file.originalname}`);   
   }
});

const templates = multer({
   storage: thumbs,
})
 
TemplateRoutes.post('/upload_template', templates.single("image"), (req, res) => {
	const data = req.body.data;
	const category = req.body.category
	const name = req.file.filename

	Templates.create({data : data, category: category, name: name})
	.then(template => {
		res.json('Template Saved')
	}).catch(err => res.json({err}))
})

TemplateRoutes.post('/all_templates', (req, res) => {
	Templates.findAll().then(template => {
		res.json({ template })
	}).catch(err => {
		res.json({err})
	})
})

module.exports = TemplateRoutes