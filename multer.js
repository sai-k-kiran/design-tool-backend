const multer = require('multer');
const path = require('path');
const fs = require("fs");

const storage = multer.diskStorage({   
   destination: function(req, file, cb) { 
      cb(null, "./Uploads");     // './'
   }, 
   filename: function (req, file, cb) { 
      cb(null , `${Date.now()}-${file.originalname}`);   
   }
});

const upload = multer({
	storage: storage,
})

module.exports = upload