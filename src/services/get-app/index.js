const express = require('express')
const passport = require('passport')


const getApp = () => {
    const app = express()

    const BnetStrategy = require('passport-bnet').Strategy;
    const BNET_ID = '8d44ce669c4842f5ab4a57befb756e65';
    const BNET_SECRET = 'hr13Kigyr0KXrKgGOpD8mFOTcuo1Tguc';
    
    // Use the BnetStrategy within Passport.
    passport.use(new BnetStrategy({
        clientID: BNET_ID,
        clientSecret: BNET_SECRET,
        callbackURL: "http://localhost:3000/redirect",
        region: "us"
    }, function(accessToken, refreshToken, profile, done) {
        console.log('This function')
        console.log(accessToken, refreshToken, profile)
        return done(null, profile);
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
        });
    
    app.get('/oauth/battlenet',
        passport.authenticate('bnet'));
    
    app.get('/redirect',
        passport.authenticate('bnet', { failureRedirect: '/' }),
        function(req, res){
            console.log('redirect1')
            console.log(req, res)
            res.redirect('/');
        });
    
   return app;
}

module.exports = getApp;