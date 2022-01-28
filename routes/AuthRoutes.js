const express = require('express')
const AuthRoutes = express.Router()
const {User} = require('../models')
const bcrypt = require('bcrypt')
const multer = require('multer');
const path = require('path');
const fs = require("fs");

const logos = multer.diskStorage({   
   destination: function(req, file, cb) { 
      cb(null, "./Logos");
   }, 
   filename: function (req, file, cb) { 
      cb(null , `${Date.now()}-${file.originalname}`);   
   }
});

const updates = multer({
   storage: logos,
})

AuthRoutes.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email
    const password = req.body.password

    User.findOne({
        where: { email: email }
    }).then(user => {
        if (!user) {
            bcrypt.hash(password, 10, (err, hash) => {
            User.create({
                name: name,
                email: email,
                password: hash
            }).then(user => {
                    res.json({user}) // {}
                })
                .catch(err => {
                    res.send('ERRORsai: ' + err)
                })
            })
        } else {
            res.json({ error: "USER ALREADY EXISTS" })
        }
    })
    .catch(err => {
        res.send('ERROR: ' + err)
    })
})

AuthRoutes.post('/login', async (req, res) => {
	const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ where: {email: email} }) 
    if(!user) console.log("User doesnt exists")

    bcrypt.compare(password, user.password).then((match) => {
        if(!match) console.log("Email/Password wrong")
        res.json({user})
    })
})

AuthRoutes.post('/update',updates.single('image'), (req, res) => {
    const company = req.body.company
    const address = req.body.address
    const phone = req.body.phone
    const email = req.body.email
    const logo = req.file.filename

    User.update({
        company: company,
        address: address,
        phone: phone,
        logo: logo
    }, {where: {email: email}})
    .then(() => { return User.findOne({ where: {email: email} }) })
    .then(user => res.json({user}))
    .catch(err => console.log('AuthRoutes 75', err))
})
 
module.exports = AuthRoutes