const ExternalRoutes = require("express").Router();
const passport = require("passport");
const { OAuth2Client } = require('google-auth-library')
require('dotenv').config()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


ExternalRoutes.get("/login/success", (req, res) => {
    if(req.user) {
        res.status(200).json({
            success: true,
            message: 'Succesful',
            user: req.user
        })
    }
})

ExternalRoutes.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

ExternalRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("https://localhost:3000/");
});

ExternalRoutes.get("/google",
    passport.authenticate("google", {scope: ['profile', 'email']})
)

ExternalRoutes.get("/google/callback",
    passport.authenticate("google", {
        successRedirect: "https://localhost:3000/home/allDesigns",
        failureRedirect: "https://localhost:3000/login/failed"
    }),
    function (req, res) {
        res.send(req.user)
    }
)

ExternalRoutes.get("/facebook", 
    passport.authenticate("facebook", {scope: ['email']})
)

ExternalRoutes.get("/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "https://localhost:3000/login/success",
      failureRedirect: "https://localhost:3000/login/failed"
    }),
    function (req, res) {
        res.send(req.user)
    }
  );

ExternalRoutes.get("/linkedIn", 
    passport.authenticate("linkedin")
)

ExternalRoutes.get("/linkedIn/callback",
    passport.authenticate("linkedin", {
      successRedirect: "https://localhost:3000/login/success",
      failureRedirect: "https://localhost:3000/login/failed"
    }),
    function (req, res) {
        res.send(req.user)
    }
  );

module.exports = ExternalRoutes