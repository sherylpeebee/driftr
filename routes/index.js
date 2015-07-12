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
  }

  // user1.save();

  // var user1 = new User({name: 'from Mongoos'});
  // var house1 = new House({location: 'Fremont'});
  // house1.save;

var loggedIn;
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


  

  router.post('/user', function(req, res) {

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

  router.get("/getUserData", function(req, res) {
    res.json(req.user);
  });

  router.get("/auth/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });


  return router;
};

module.exports = routes;
