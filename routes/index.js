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

    //
    // var houseSchema = mongoose.Schema({
    //   location: String,
    //   bedrooms: Number,
    //   bathrooms: Number,
    //   petsAllowed: Boolean,
    //   startDate: Date,
    //   endDate: Date
    // });
    // mongoose.model('House', houseSchema);


    // var Person = mongoose.model('Person', yourSchema);
    // // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
    // Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
    //   if (err) return handleError(err);
    //   console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
    // });

  router.get('/auth/twitter', passport.authenticate('twitter'));

  router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/');
  });

  router.get("/getUserData", function(req, res) {
    res.json(req.user);
  });

  // var houseSchema = mongoose.Schema({
  //   location: String,
  //   bedrooms: Number,
  //   bathrooms: Number,
  //   petsAllowed: Boolean,
  //   startDate: Date,
  //   endDate: Date
  // });
  // mongoose.model('House', houseSchema);
  // var userInfo = mongoose.schema({
  //
  // });

  router.post('/userInfo', function(req, res) {
    console.log("~~~~~~~~~~~~~~~~~~~~!!BODYBODYBODY!!~~~~~~~~~~~~~~~~~~~~~");
    // var userInfo = req.body;

    User.findOneAndUpdate({ "twitter.username": req.body.twitter.username }, req.body.owner, { new: true }, function(err, updatedUser) {
      console.log(err, updatedUser);
      if (err) {
        console.log(err);
        res.status(400).json({ error: "Could not read user data" });
      }
      res.json(updatedUser);
  });

    res.status(200).send("ok");
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
