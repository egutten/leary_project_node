const db = require("../models");
const passport = require("../config/passport");
const moment = require("moment");

const axios = require('axios');

module.exports = (app) => {
//***************************************************************
//User flow
//***************************************************************

//Authentication
  app.post("/login", passport.authenticate("local"), (req, res) => {
    const rawUserData = JSON.stringify(res.req.user);
    const rawSessionData = JSON.stringify(res.req.session);
    const data = {
      userData: JSON.parse(rawUserData),
      sessionData: JSON.parse(rawSessionData),
    }
    res.json({
        userId: data.userData.id,
        expiration: data.sessionData.cookie.expires,
        email: data.userData.email
      });
  });

  app.post("/signup", (req, res) => {
    const newUser = db.User.create({
      email: req.body.email,
      password: req.body.password,
      company_name: req.body.company_name
    }).then(() => {
      res.json(newUser);
    }).catch((err) => {
      console.log(err);
      res.status(500);
      res.json({error: err});
    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.json("done");
  });
  
//User creates conversion events
  app.post("/ce", (req, res) => {
    function checkUserConversionEvents() {
      return new Promise((resolve, reject) => {
        db.ConversionEvent.findAll({
          where: {
            conversion_event: req.body.conversion_event,
            user_id: req.body.user_id
          }
        }).then((response) => {
          const rawData = JSON.stringify(response);
          const data = JSON.parse(rawData);
          resolve(data);
        });
      })   
    }
    
    function createConversionEvent() {
      db.ConversionEvent.create({
        conversion_event: req.body.conversion_event,
        user_id: req.body.user_id
      }).then((response) => {
        const rawData = JSON.stringify(response);
        const data = JSON.parse(rawData);
        res.json(data.id);
      })
    }
    
    checkUserConversionEvents()
    .then((response) => {
      if (!response.length > 0) {
        createConversionEvent()
      } else {
        res.json(response[response.length-1].id);
      }  
    }).catch((err) => {
      console.log(err);
      res.status(500);
      res.json({error: err});
    }); 
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
    
    function createCustomer() {
      return new Promise((resolve, reject) => {
        db.Customer.create()
        .then((response) => {
          res.json(response.id);
          resolve(response.id);
        });
      });
    }   
    
    function trackActivity(response) {
      db.CustomerActivity.create({
        event: activity.event,
        conversion_event_id: activity.conversion_event_id,
        customer_id: activity.customer_id || response,
        user_id: activity.user_id
      })
    }
    
    if (activity.event === "view") {
      createCustomer()
      .then((response) => {
        trackActivity(response);
      }).catch((err) => {
        console.log(err);
        res.status(500);
        res.json({error: err});
      });  
    } else {
      trackActivity();
    }    
  });  
  
  //Update customer data upon conversion
  app.post("/customer-update", (req, res) => {
    function updateCustomerContact() {
      return new Promise((resolve, reject) => {
        db.Customer.update({
          email: req.body.email,
          company_name: req.body.company_name,
          first_name: req.body.first_name,
          last_name: req.body.last_name
        },
        {
        where: {
          id: req.body.customer_id
          }
        }).then(() => {
          const email = req.body.email;
          const emailParse = email.split("@");
          const url = emailParse[1];
          resolve({ 
             url: url,
             customer_id: req.body.customer_id
           });
         });
       });
     }  
     
     function updateCustomerLogo(response) {
       db.Customer.update({
         logo: response.url
       },
       {
         where: {
           id: response.customer_id
         }
       });
     }

    updateCustomerContact()
    .then((response) => {
      updateCustomerLogo(response);
    }).catch((err) => {
      console.log(err);
      res.status(500);
      res.json({error: err});
    });  
  })    
  
  //Check for messages, render them, then record views
  app.post("/messages", (req, res) => {   
    function getMessageNumber() {
      return new Promise((resolve, reject) => {
        db.CustomerActivity.findAll({
          where: {
            event: "conversion",
            user_id: req.body.user_id
          }
        }).then((response) => {
          const rawData = JSON.stringify(response);
          const data = JSON.parse(rawData);
          resolve(data.length);
        });
      })
    } 
    
    function getMessageData() {
      return new Promise((resolve, reject) => {
        db.CustomerActivity.findAll({
          limit: 5,
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
        }).then((activities) => {
          const messages = [];
          for (i = 0; i < activities.length; i++) {
            const rawData = JSON.stringify(activities[i]);
            const data = JSON.parse(rawData);
            const created = data.createdAt;
            const createdAt = moment(created).valueOf();
            const timestamp = moment(createdAt).fromNow();
            const messageData = {
              timestamp: timestamp,
              logo: data.Customer.logo,
              conversion_event: data.ConversionEvent.conversion_event,
              conversion_event_id: data.ConversionEvent.id
            }
            messages.push(messageData);
          }
          resolve(messages);
        }).catch((err) => {
          console.log(err);
          res.status(500);
          res.json({error: err});
        });    
      })
    } 

    function recordMessageView(response) {
      db.CustomerActivity.update({
          props: response.logo,
          conversion_event_id: response.conversion_event_id
        },
        {
        where: {
          customer_id: req.body.customer_id,
          event: "view"
        }
      })
    } 
    
    getMessageNumber()
    .then((response) => {
      if (response > 0) {
        getMessageData()
        .then((response) => {
          res.json(response[0]);
          recordMessageView(response[0]);
        })
      } else {
        return
      }
    }).catch((err) => {
      console.log(err);
      res.status(500);
      res.json({error: err});
    }); 
  });  
}
