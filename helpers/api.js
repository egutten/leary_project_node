const db = require("../models");
const moment = require("moment");
const axios = require('axios');

 const fn = {
   
   createConversionEvent: (data) => { 
     return db.ConversionEvent.create({
       conversion_event: data.conversion_event,
       position: data.position,
       user_id: data.user_id
     }).then((response) => {
       return response.dataValues;
     })
   },
   
   getConversions: (user_id) => {
     return db.ConversionEvent.findAll({
       where: {
         user_id: user_id
       }
     }).then((response) => {
       return response;
     });   
   },
   
   updateConversionEvent: (data) => {
     return db.ConversionEvent.update({
        conversion_event: data.conversion_event,
        position: data.position
      },
      {
        where: {
          id: data.conversion_event_id
        },
        returning: true
      }).then((response) => {
        return response[1][0].dataValues;
      })
   },
  
  createCustomer: () => {
    return db.Customer.create()
      .then((response) => {
        return response.id;
      })
  },

  trackActivity: (data) => {
    return db.CustomerActivity.create({
      event: data.event,
      conversion_event_id: data.conversion_event_id,
      customer_id: data.customer_id,
      user_id: data.user_id
    })
  },
  
  updateCustomerContact: (data) => {
    return db.Customer.update({
        email: data.email,
        company_name: data.company_name,
        first_name: data.first_name,
        last_name: data.last_name
      },
      {
      where: {
        id: data.customer_id
        }
      }).then(() => {
        const email = data.email;
        const emailParse = email.split("@"); // TODO: turn into small function "getUrlFromEmail"
        const url = emailParse[1];
        return ({ 
           url: url,
           customer_id: data.customer_id
         });
       });
    },
   
   updateCustomerLogo: (response) => {
     db.Customer.update({
       logo: response.url
     },
     {
       where: {
         id: response.customer_id
       }
     });
   },
   
   getMessageNumber: (user_id) => {
     return db.CustomerActivity.findAll({
       where: {
         event: "conversion",
         user_id: user_id
       }
     }).then((response) => {
       return response.length;
     });
   },
   
   getMessageData: (user_id) => {
    return db.CustomerActivity.findAll({
       limit: 5,
       where: {
         event: "conversion",
         user_id: user_id
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
         const created = activities[i].createdAt;
         const createdAt = moment(created).valueOf();
         const timestamp = moment(createdAt).fromNow();
         const messageData = {
           timestamp: timestamp,
           logo: activities[i].Customer.logo,
           conversion_event: activities[i].ConversionEvent.conversion_event,
           conversion_event_id: activities[i].ConversionEvent.id
         }
         messages.push(messageData);
       }
       return messages;
     }).catch((err) => {
       console.log(err);
       res.status(500);
       res.json({error: err});
     });    
   },
   
   recordMessageView: (message, customer_id) => {
     db.CustomerActivity.update({
         props: message.logo,
         conversion_event_id: message.conversion_event_id
       },
       {
       where: {
         customer_id: customer_id,
         event: "view"
       }
     })
   }     
}

module.exports = fn;
