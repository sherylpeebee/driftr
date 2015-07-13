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

      // user.userType = req.body.userType;
      if (req.body.userType === 'owner') {
        user.owner = {
          firstName: req.body.owner.firstName,
          lastName: req.body.owner.lastName,
          email: req.body.owner.email,
        };
      } else if (req.body.userType === 'traveller') {
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
        };
      }

      user.save(function(){
        res.json(user);
      });

    });

  });

  router.post('/house', function(req, res) {
    console.log(req.body);
    var house = new House({
      userID: req.body.user,
      image: req.body.image,
      location: req.body.location,
      squareFoot: req.body.squareFoot,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      startDate: req.body.startDate,
      endDate: req.body.endDate
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

  router.get('/listings', function(req, res) {
    House.find(function(err, houses) {
      if (err) {
        res.send(err);
      }
      res.json(houses);
    });
  });

  router.get('/travellers', function(req, res) {
    User.find({traveller: {$exists: true}}, function(err, travellers) {
      if (err) {
        res.send(err);
      }
      res.json(travellers);
    });
  });

  router.get('/ownerProfile', function(req, res) {
    console.log(req);
    // User.findOne({'twitter.id': req.body.user.twitter }, function(err, owner) {
    //   if (err) {
    //     res.send(err);
    //   }
    //   console.log(owner);
    //   res.json(owner);
    // });
  });


  router.get("/listing/:houseId", function(req, res) {
    var houseId = req.params.houseId;
    // console.log('location', location);
    House.findOne({_id: houseId}).exec(function(err, house) {
      if (err) {
        console.log(err);
        res.status(400).json({ error: "Could not read house data" });
      }
      if (!house) {
        res.status(404);
      }
      res.json(house);
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
