const express = require('express') // creating an instance of express library
const cors = require('cors')
const AuthRouter = require('./routes/AuthRoutes')
const ExternalRoutes = require('./routes/ExternalRoutes')
const UploadRoutes = require('./routes/UploadRoutes')
const DesignRoutes = require('./routes/DesignRoutes')
const TemplateRoutes = require('./routes/TemplateRoutes')
const passport = require('passport')
const passportSetup = require('./passport')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config()
const path = require('path');
const dbs  = require('./models')
const fs = require("fs");
var https = require('https');
var http = require('http');


const app = express()

app.use(cors({
    origin: "https://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json()) // To capture the data from frontend

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}))
 
app.use(session({
    key: "userID",
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 24 * 60 * 60 * 1000
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', AuthRouter)
app.use('/auth', ExternalRoutes)
app.use('/image', UploadRoutes)
app.use('/saved', DesignRoutes)
app.use('/templates', TemplateRoutes)
app.use('/Uploads', express.static(path.join(__dirname, '/Uploads')));
app.use('/Logos', express.static(path.join(__dirname, '/Logos')));
app.use('/Thumbnails', express.static(path.join(__dirname, '/Thumbnails')));

var options = {
  key: fs.readFileSync('./.cert/key.pem'),
  cert: fs.readFileSync('./.cert/cert.pem')
};

http.createServer(app).listen(80);

dbs.sequelize.sync().then(() => {
    https.createServer(options, app).listen(3001, () => {
        console.log("Server running on port 3001");
    });
}).catch(err => console.log(err))

 