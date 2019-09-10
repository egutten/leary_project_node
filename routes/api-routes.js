var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  
  // app.get("/api", async function(req, res){
  //   try {
  //     const users = await db.User.findAll();
  //     res.json(users);
  //   }
  //   catch(err) {
  //     console.log(err);
  //     res.status(500);
  //     res.json({error: err});
  //   }
  // });

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
    const newConversionEvent = db.ConversionEvent.create({
      conversion_event: req.body.conversion_event,
      user_id: req.body.user_id
    }).then(function() {
      res.json(newConversionEvent);
    }).catch(function(err) {
      res.status(500);
      res.json({error: err});
    });
  });

  //get user id for conversion event.
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

  //create customer on load
  app.post("/customer", async function(req, res){
    var newCustomer = db.Customer.create()
      .then(function(response) {
        res.json({id: response.dataValues.id});
      })
      .catch(function(err) {
      res.status(500);
      res.json({error: err});
    });
  });


  //create customer-acvitity on load
  app.post("/customer-activity", async function(req, res){
    const newCustomerActivity = db.CustomerActivity.create({
      user_id: req.body.user_id,
      customer_id: req.body.customer_id,
      event: 'view'
    }).then(function() {
      res.json(newCustomerActivity);
    }).catch(function(err) {
      res.status(500);
      res.json({error: err});
    });
  });

}
