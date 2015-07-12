var routes = function(passport) {

  var express = require('express');
  var Twitter = require("twitter");
  var router = express.Router();
  var mongoose = require('mongoose');
  var House = require('../app/models/house');
  var User = require('../app/models/user');


  function twitterClient(user) {
    return new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: user && user.twitter.token,
      access_token_secret: user && user.twitter.tokenSecret
    });
  }

  router.get("/", function(req, res) {
    res.render("index", { user: req.user, title: 'Griftr' });
  });

  router.get('/auth/twitter', passport.authenticate('twitter'));

  router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/');
  });

  router.get("/getUserData", function(req, res) {
    res.json(req.user);
  });


  router.post('/test', function() {
    res.send("ok").status(200);
  });

  router.post('/userinfo', function(req, res) {
    console.log("~~~~~~~~~~~~~~~~~~~~!!BODYBODYBODY!!~~~~~~~~~~~~~~~~~~~~~");

    console.log(req.body);



    User.findOne({'twitter.username': req.body.twitter.username}, function(err, user){
      console.log('user: ', user);
      if (err) { res.status(400).json('shorry bro'); }
      
      if (user.userType === 'owner') {
        user.owner = {
          lastName: req.body.owner.lastName,
          email: req.body.owner.email,
          image: req.body.owner.image,
          startDate: req.body.owner.startDate,
          endDate: req.body.owner.endDate,
          info: {
            pets: req.body.owner.pets,
            plants: req.body.owner.plants,
            updates: req.body.owner.updates,
            smoking: req.body.owner.smoking,
            other: req.body.owner.other
          }
        }
      } else {
        user.traveller = {
          lastName: req.body.traveller.lastName,
          email: req.body.traveller.email,
          image: req.body.traveller.image,
          startDate: req.body.traveller.startDate,
          endDate: req.body.traveller.endDate,
          info: {
            pets: req.body.traveller.pets,
            plants: req.body.traveller.plants,
            updates: req.body.traveller.updates,
            smoking: req.body.traveller.smoking,
            other: req.body.traveller.other
          }
        }        
      }

      user.save(function(){
        res.json(user);
      });

    });

  });

  router.get('/houses', function(req, res) {
    House.find(function(err, houses) {
      if (err) {
        res.send(err);
      }
      res.json(houses);
    });
  });
  router.get('/house/:location', function(req, res) {
    var location = req.params.location;
    House.findOne({"location": location},function(err, house) {
      if (err) {
        res.send(err);
      }
      res.json(house);
    });
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


  router.get("/auth/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });



  // router.post('/tweet', function(req, res, next) {
  //   var client = twitterClient(req.user);
  //   client.post('statuses/update', { status: req.body.tweet }, function(error, tweets, response){
  //     if (error) {
  //       console.error(error);
  //       res.status(500);
  //       return;
  //     }
  //     res.json(tweets);
  //   });
  // });
  return router;
};

module.exports = routes;
