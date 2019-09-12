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
  console.log(url);
  axios.post("http://localhost:8080/add-logo", {
      logo: url,
      customer_id: customer_id
    }).then(response => {
      console.log("done");
    }).catch(err => {
      console.log(err.message);
    })
  // axios.get("https://api.ritekit.com/v1/images/logo?domain=" + url + "&client_id=c2f7b301191de1ea382281a7aec589eba6d8d3378c36")
  //   .then(response => {
  //     // let buff = new Buffer(response.data);
  //     // var logo = (buff.toString("utf-8"));
  //     axios.post("http://localhost:8080/add-logo", {
  //         logo: response.data,
  //         customer_id: customer_id
  //       }).then(response => {
  //         console.log("done");
  //       }).catch(err => {
  //         console.log(err.message);
  //       })
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
})

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
      console.log("done");
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
  
  //get conversion event id to retrieve text for message and set timestamp
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
      var created = response[0].dataValues.createdAt
      var createdAt = moment(created).valueOf();
      var timestamp = moment(createdAt).fromNow();
      res.json({
          timestamp: timestamp,
          conversion_event_id: response[0].dataValues.conversion_event_id,
          customer_id: response[0].dataValues.customer_id
      });
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
  
  //update customer for logo
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
  
  //get customer by customer_id
  app.post("/get-customer", async function(req, res){
    try {
      const customer = await db.Customer.findAll({
        where: {
          id: req.body.id
        }
      });
      res.json(customer);
    }
    catch(err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    }
  });
}
