// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
//
module.exports = function(app) {

  app.post("/login", passport.authenticate("local"), function(req, res) {
    res.json(res.req.sessionID);
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

  app.get("/api", async function(req, res){
    try {
      const users = await db.User.findAll();
      res.json(users);
    }
    catch(err) {
      res.status(500);
      res.json({error: err});
    }
  });
};
