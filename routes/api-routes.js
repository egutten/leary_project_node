// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
// const {stringify} = require('flatted/cjs')
//
module.exports = function(app) {

//Authentication
  app.post("/login", passport.authenticate("local"), function(req, res) {
    res.json(
      {
        sessionId: res.req.sessionID,
        email: res.req.body.email
      });
  });

  app.post("/signup", function(req, res) {
    console.log(req.body);
    const newUser = db.User.create({
      email: req.body.email,
      password: req.body.password,
      company_name: req.body.company_name
    }).then(function() {
      res.json(newUser);
    }).catch(function(err) {
      res.status(500);
      res.json({error: err});
    });
  });

  app.get("/logout", function(req, res) {
    req.logout();
  });
  
//Conversion Events
  app.post("/ce", function(req, res) {
    console.log(req.body.user_id);
    const newConversionEvent = db.ConversionEvent.create({
      conversion_event: req.body.conversion_event,
      user_id: req.body.user_id
    }).then(function() {
      console.log(newConversionEvent)
      res.json(newConversionEvent);
    }).catch(function(err) {
      res.status(500);
      res.json({error: err});
    });
  });

  app.get("/api", async function(req, res){
    try {
      const users = await db.User.findAll();
      res.json(users);
    }
    catch(err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    }
  });
  
  app.post("/user", async function(req, res){
    try {
      console.log(req.params)
      const user = await db.User.findAll({
        where: {
          email: req.body.email
        }
      });
      res.json(user);
    }
    catch(err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    }
  });
};
