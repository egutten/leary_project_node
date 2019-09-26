const db = require("../models");
const passport = require("../config/passport");
const moment = require("moment");
const fn = require("../helpers/api");

const axios = require('axios');

module.exports = (app) => {
//***************************************************************
//User flow
//***************************************************************

//Authentication
  app.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({
        userId: res.req.user.dataValues.id,
        expiration: res.req.session.cookie.expires,
        email: res.req.user.dataValues.email
    })
  });

  app.post("/signup", (req, res) => {
    const newUser = db.User.create({
      email: req.body.email,
      password: req.body.password,
      company_name: req.body.company_name
    }).then(() => {
      res.json(newUser);
    }).catch((err) => {
      console.log(err.errors[0].message);
      res.json(err.errors[0].message);
    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.json("done");
  });
  
//User creates conversion events
  app.post("/admin/messages", (req, res) => { 
    const data = {
      conversion_event: req.body.conversion_event,
      user_id: req.body.user_id,
      conversion_event_id: req.body.conversion_event_id,
      position: req.body.position
    }
    
    if (data.conversion_event_id) {
      fn.updateConversionEvent(data)
      .then((updatedConversionEvent) => {
        console.log(updatedConversionEvent);
        res.json(updatedConversionEvent);
      });
    } else {
      fn.createConversionEvent(data)
      .then((newConversionEvent) => {
        res.json(newConversionEvent);
      }).catch((err) => {
        console.log(err);
        res.status(500);
        res.json({error: err});
      }); 
    }
  });  
  
  app.post("/admin/get-messages", (req, res) => {
    const user_id = req.body.user_id
    
    fn.getConversions(user_id)
    .then((conversions) => {
      res.json(conversions);
    })
  });
  
  //******************************************************************
  //Widget-flow
  //******************************************************************

  //Create customer activities for views and conversions
  app.post("/customer-activity", (req, res) => {
    const activity = {
      user_id: req.body.user_id,
      event: req.body.event,
      conversion_event_id: req.body.conversion_event_id,
      customer_id: req.body.customer_id
    };
    
    if (activity.event === "view") {
      fn.createCustomer()
      .then((customer_id) => {
        activity.customer_id = customer_id;
        fn.trackActivity(activity);
        res.json(customer_id);
      }).catch((err) => {
        console.log(err);
        res.status(500);
        res.json({error: err});
      });  
    } else {
      fn.trackActivity(activity);
    }    
  });  
  
  //Update customer data upon conversion
  app.post("/customer-update", (req, res) => {
    const customerData = {
      email: req.body.email,
      company_name: req.body.company_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      customer_id: req.body.customer_id
    }
     
    fn.updateCustomerContact(customerData)
    .then((response) => {
      fn.updateCustomerLogo(response);
    }).catch((err) => {
      console.log(err);
      res.status(500);
      res.json({error: err});
    });  
  })    
  
  //Check for messages, render them, then record views
  app.post("/messages", (req, res) => { 
    data = {
      user_id: req.body.user_id,
      customer_id: req.body.customer_id
    }  
    
    fn.getMessageNumber(data.user_id)
    .then((response) => {
      if (response > 0) {
        fn.getMessageData(data.user_id)
        .then((messages) => {
          res.json(messages[0]);
          fn.recordMessageView(messages[0], data.customer_id);
        })
      } else {
        return // TODO: Remove getMessageNumber() and handle the if/then check for results in the getMessageData.then above
      }
    }).catch((err) => {
      console.log(err);
      res.status(500);
      res.json({error: err});
    }); 
  });  
}
