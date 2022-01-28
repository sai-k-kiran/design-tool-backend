const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
require('dotenv').config()
const {User} = require('./models')
  
passport.use(
    new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.SECRET_KEY,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, cb) {

    User.findOne({
        where: {googleId: profile.id}
    }).then(user => {
        if(!user){
            User.create({
                name: `${profile.name.givenName} ${profile.name.familyName}`,
                email: profile.emails[0].value,
                googleId: profile.id 
            }).then(user => {
                cb(null, user)
                res.json({user})
            }).catch(err => {
                console.log('ERROR: ' + err)
            })
        } else if(user) {
            cb(null, user)
        } else {
             console.log({ error: "USER ALREADY EXISTS" })
        }
    })
    .catch((err)=> {
        console.log("passport.js 23", err)
        cb(err, null)
    })
  }
));

passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
        passReqToCallback: true,
      },
       function(req, accessToken, refreshToken, profile, cb) {

    User.findOne({
        where: {facebookId: profile.id}
    }).then(user => {
        if(!user){
            User.create({
                name: profile.displayName,
                facebookId: profile.id 
            }).then(user => {
                cb(null, user)
                res.json({user})
            }).catch(err => {
                console.log('ERRORsai: ' + err)
            })
        } else if(user) {
            cb(null, user)
        } else {
             console.log({ error: "USER ALREADY EXISTS" })
        }
    })
    .catch((err)=> {
        console.log("passport.js 23", err)
        cb(err, null)
    })
  }
    )
  );

passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_SECRET,
        callbackURL: "/auth/linkedIn/callback",
        scope: ['r_emailaddress', 'r_liteprofile'],
        passReqToCallback: true,
      },
       function(req, accessToken, refreshToken, profile, cb) {

    User.findOne({
        where: {linkedInId: profile.id}
    }).then(user => {
        if(!user){
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                linkedInId: profile.id 
            }).then(user => {
                cb(null, user)
                res.json({user})
            }).catch(err => {
                console.log('ERRORsai: ' + err)
            })
        } else if(user) {
            cb(null, user)
        } else {
             console.log({ error: "USER ALREADY EXISTS" })
        }
    })
    .catch((err)=> {
        console.log("passport.js 23", err)
        cb(err, null)
    })
  }
    )
  );
  
passport.serializeUser((user, cb) => {
    console.log("serializing", user)
    cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
    const user = await User.findOne({where: {id}})
    .catch(err => {
        console.log("passport.js 55", err)
        cb(err, null)
    }) 
    if(user) {
        cb(null, user)
    }
})