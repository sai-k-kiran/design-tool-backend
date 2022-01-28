const express = require('express')
const DesignRoutes = express.Router()
const {Design} = require('../models')

DesignRoutes.post('/design_upload', (req, res) => {
	const data = req.body.data;
	const user_id = req.body.userId
	Design.create({data : data, userId: user_id})
	.then(design => {
		res.json('Design Saved')
	}).catch(err => res.json({err}))
})

DesignRoutes.post('/design', (req, res) => {
	const user_id = req.body.userId
	Design.findAll({
		where: { userId: user_id}
	}).then(design => {
		res.json({ design })
	}).catch(err => {
		res.json({err})
	})
})
DesignRoutes.post('/delete_saved', (req, res) => {
	const id = req.body.id
	Design.destroy({ where: {id: id}})
	.then(response => {
		res.json({response})
	}).catch(err => console.log(err))
})
module.exports = DesignRoutes