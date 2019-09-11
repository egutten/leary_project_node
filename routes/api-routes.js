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
      event: req.body.event
    }).then(function() {
      res.json(newCustomerActivity);
    }).catch(function(err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    });
  });
  
  //update customer data upon conversion
  app.post("/customer-update", async function(req, res){
    db.Customer.update(
      {
        email: req.body.email,
        company_name: req.body.company_name,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      },
      {
      where: {
        id: req.body.customer_id
        }
      }
    ).then(function() {
      res.json("done");
    }).catch(function(err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    });
  });
  
  //create customer activity upon conversion
  app.post("/customer-activity-conversion", async function(req, res){
    db.CustomerActivity.create(
      {
        event: req.body.event,
        conversion_event_id: req.body.conversion_event_id,
        customer_id: req.body.customer_id,
        user_id: req.body.user_id
      }
    ).then(function() {
      res.json("done");
    }).catch(function(err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    });
  });
  
  //get conversion event id to retrieve text for message
  app.get("/conversion-event-id", async function(req, res){
    db.CustomerActivity.findAll(
      {
        limit: 1,
        where: {
          event: "conversion",
        },
        order: [ ['createdAt', 'DESC'] ]
      }
    ).then(function(response) {
      res.json(response);
    }).catch(function(err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    })
  })
  
  //get conversion text for message from conversion event id
  app.post("/conversion-event-text", async function(req, res){
    try {
      const conversionEvent = await db.ConversionEvent.findAll({
        where: {
          id: req.body.id
        }
      });
      res.json(conversionEvent);
    }
    catch(err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    }
  });

}
