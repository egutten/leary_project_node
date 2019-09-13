var db = require("../models");
var passport = require("../config/passport");
var moment = require("moment");
var Queue = require('better-queue');

const axios = require('axios');

var q = new Queue(function(input, cb) {
  var email = input.email;
  var customer_id = input.customer_id;
  var emailParse = email.split("@");
  var url = emailParse[1];
  axios.post("http://localhost:8080/add-logo", {
      logo: url,
      customer_id: customer_id
    }).then(response => {
      console.log("logo done");
    }).catch(err => {
      console.log(err.message);
    })
})

module.exports = function(app) {
//***************************************************************
//User flow
//***************************************************************

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
  
  //Get user id to associate it to the conversion event created below
  app.post("/user", async function(req, res){
    const user = await db.User.findAll({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      res.json(user);
    }).catch(function(err){
      console.log(err);
      res.status(500);
      res.json({error: err});
    })
  });
  
//User creates conversion events
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
  
  //******************************************************************
  //Widget-flow
  //******************************************************************

  //Create customer on load
  app.post("/customer", async function(req, res){
    var newCustomer = db.Customer.create()
      .then(function(response) {
        res.json({id: response.dataValues.id});
    }).catch(function(err) {
      res.status(500);
      res.json({error: err});
    });
  });

  //Create customer-acvitity (visit) on load
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
  
  //Update customer data upon conversion
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
      console.log("customer-update done");
      res.json("done");
      q.push({
        email: res.req.body.email,
        customer_id: res.req.body.customer_id
      })
    }).catch(function(err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    });
  });
  
  //Get conversion_id for specific user
  app.post("/conversion-id", async function(req, res){
    db.ConversionEvent.findAll({
        where: {
          user_id: req.body.user_id
        }
    }).then(function(response) {
      res.json(response[0].dataValues.id);
    }).catch(function(err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    });
  })
  
  //Create customer activity (conversion) upon conversion
  app.post("/customer-activity-conversion", async function(req, res){
    db.CustomerActivity.create(
      {
        event: req.body.event,
        conversion_event_id: req.body.conversion_event_id,
        customer_id: req.body.customer_id,
        user_id: req.body.user_id
      }
    ).then(function() {
      console.log("customer-activity-conversion done")
      res.json("done");
    }).catch(function(err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    });
  });
  
  //Update customer record with logo url (company URL to be used in logo API)
  app.post("/add-logo", async function(req, res){
    db.Customer.update(
      {
        logo: req.body.logo,
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
  
  //Assembling all data to render a message
  app.post("/message", async function(req, res){
    db.CustomerActivity.findAll(
      {
        limit: 1,
        where: {
          event: "conversion",
          user_id: req.body.user_id
        },
        include: [
        {
          model: db.ConversionEvent,
          as: 'ConversionEvent'
        },
        { 
          model: db.Customer,
          as: 'Customer'
        }],
        order: [ ['createdAt', 'DESC'] ]
      }
    ).then(function(response) {
      var created = response[0].dataValues.createdAt
      var createdAt = moment(created).valueOf();
      var timestamp = moment(createdAt).fromNow();
      res.json({
        conversion_event: response[0].dataValues.ConversionEvent.dataValues.conversion_event,
        logo: response[0].dataValues.Customer.dataValues.logo,
        timestamp: timestamp
        });
    }).catch(function(err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    })
  });
  
  //Record message logo that customer saw
  app.post("/customer-props", async function(req, res){
    db.CustomerActivity.update(
      {
        props: req.body.logo,
      },
      {
      where: {
        customer_id: req.body.customer_id,
        event: "view"
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
}
