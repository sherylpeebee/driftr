var routes = function(passport) {

  var express = require('express');
  var Twitter = require("twitter");
  var router = express.Router();
  var mongoose = require('mongoose');
  var House = require('../app/models/house');

  function twitterClient(user) {
    return new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: user && user.twitter.token,
      access_token_secret: user && user.twitter.tokenSecret
    });
  };

  // user1.save();

  // var user1 = new User({name: 'from Mongoos'});
  // var house1 = new House({location: 'Fremont'});
  // house1.save;


  router.get("/", function(req, res) {
    res.render("index", { user: req.user, title: 'Griftr' });
  });

  router.get('/auth/twitter', passport.authenticate('twitter'));

  router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/');
  });

  router.get('/houses', function(req, res) {
    res.json({message: 'house data'});
  });

  router.post('/houses', function(req, res) {

    var house = new House({
      location: req.body.location,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      petsAllowed: req.body.petsAllowed,
      startDate: Date.now(),
      endDate: Date.now()
    });

    house.save(function(err, savedHouse) {
      if (err) {
        console.log(err);
        res.status(400).json({ error: "Validation Failed" });
      }
      console.log("House Saved:", savedHouse);
      res.json(savedHouse);
    }); 
  });


  router.post('/tweet', function(req, res, next) {

    var client = twitterClient(req.user);
    client.post('statuses/update', { status: req.body.tweet }, function(error, tweets, response){
      if (error) {
        console.error(error);
        res.status(500);
        return;
      }
      res.json(tweets);
    });
  });

  router.get("/auth/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });


  return router;
}

module.exports = routes;
