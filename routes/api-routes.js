var db = require("../models");
var passport = require("../config/passport");
var moment = require("moment");

const axios = require('axios');

module.exports = function(app) {
//***************************************************************
//User flow
//***************************************************************

//Authentication
  app.post("/login", passport.authenticate("local"), function(req, res) {
    var rawUserData = JSON.stringify(res.req.user);
    var rawSessionData = JSON.stringify(res.req.session);
    var data = {
      userData: JSON.parse(rawUserData),
      sessionData: JSON.parse(rawSessionData),
    }
    res.json({
        userId: data.userData.id,
        expiration: data.sessionData.cookie.expires,
        email: data.userData.email
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
      console.log(err);
      res.status(500);
      res.json({error: err});
    });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.json("done");
  });
  
//User creates conversion events
  app.post("/ce", function(req, res) {
    db.ConversionEvent.create({
      conversion_event: req.body.conversion_event,
      user_id: req.body.user_id
    }).then(function() {
      res.json("done");
    }).catch(function(err) {
      res.status(500);
      res.json({error: err});
    });
  });
  
  //******************************************************************
  //Widget-flow
  //******************************************************************
  
  //Create customer activities for views and conversions
    app.post("/customer-activity", async function(req, res){
      const createCustomer = db.Customer.create();
      const customerIdPromise = createCustomer.then((response) => {
        var rawData = JSON.stringify(response);
        var data = JSON.parse(rawData);
        return data.id;
      });
      const activity = {
        user_id: req.body.user_id,
        event: req.body.event,
        conversion_event_id: req.body.conversion_event_id,
        customer_id: req.body.customer_id
      };
      
      if (!req.body.customer_id) {
        customerIdPromise
        .then((value) => {
            return db.CustomerActivity.create({
                user_id: activity.user_id,
                customer_id: value,
                event: activity.event
            })
          }).then(function(response) {
              res.json(response.dataValues.customer_id);
          }).catch(function(err) {
            console.log(err);
            res.status(500);
            res.json({error: err});
          });
        } else {
          db.CustomerActivity.create({
            event: activity.event,
            conversion_event_id: activity.conversion_event_id,
            customer_id: activity.customer_id,
            user_id: activity.user_id
          }).then(function() {
              res.json("done");
          }).catch(function(err) {
            console.log(err);
            res.status(500);
            res.json({error: err});
          });
        }
      })  
  
  //Update customer data upon conversion
  app.post("/customer-update", async function(req, res){
    const updateCustomer = db.Customer.update({
        email: req.body.email,
        company_name: req.body.company_name,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      },
      {
      where: {
        id: req.body.customer_id
        }
      });
    const customerDataPromise = updateCustomer.then(() => {
      const email = req.body.email;
      const emailParse = email.split("@");
      const url = emailParse[1];
      return { 
         url: url,
         customer_id: req.body.customer_id,
       }
    });
    
    customerDataPromise
    .then((value) => {
      db.Customer.update({
        logo: value.url
      },
      {
        where: {
          id: value.customer_id
        }
      });
    }).then(function() {
        res.json("done");
    }).catch(function(err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    });  
  })    
  
  //Check for messages, render them, then record views
  app.post("/messages", async function(req, res){
    const checkMessages = db.CustomerActivity.findAll({
      where: {
        event: "conversion",
        user_id: req.body.user_id
      }
    });
    const getMessageNumber = checkMessages.then((response) => {
      var rawData = JSON.stringify(response);
      var data = JSON.parse(rawData);
      return data.length;
    });
    const findMessages = db.CustomerActivity.findAll({
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
    });
    const sendMessageData = findMessages.then((activity) => {
      var rawData = JSON.stringify(activity);
      var data = JSON.parse(rawData);
      var created = data[0].createdAt;
      var createdAt = moment(created).valueOf();
      var timestamp = moment(createdAt).fromNow();
      return {
        timestamp: timestamp,
        logo: data[0].Customer.logo,
        conversion_event: data[0].ConversionEvent.conversion_event,
        conversion_event_id: data[0].ConversionEvent.id
      }
    });
    const recordMessageView = sendMessageData.then((response) => {
      db.CustomerActivity.update({
          props: response.logo,
          conversion_event_id: response.conversion_event_id
        },
        {
        where: {
          customer_id: req.body.customer_id,
          event: "view"
        }
      });
      return response;
    });
    
    getMessageNumber
    .then((value) => {
      if (value > 0) {
        recordMessageView
        .then((value) => {
          res.json(value);
        })  
      } else {
        console.log(value);
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    }); 
  });  
}
