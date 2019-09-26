import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSuccess = (userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authFailure = () => {
  return {
    type: actionTypes.AUTH_FAILURE,
    message: "Email or password incorrect"
  }
}

export const logout = () => {
  return dispatch => {
    axios.get(process.env.REACT_APP_NODE_API + "logout")
    .then(response => {
      dispatch(authLogout());
    })
    .catch(err => {
      console.log(err);
    });
  }
};

export const auth = (email, password) => {
  return dispatch => {
    const authData = {
      email: email,
      password: password
    };
    axios.post(process.env.REACT_APP_NODE_API + "login", authData)
    .then(response => {
      dispatch(authSuccess(response.data.userId));
    })
    .catch(err => {
      if(err.message === "Request failed with status code 401") {
        dispatch(authFailure());
      } else {
        console.log(err);
      }
    });
  }
}

export const conversion = (conversionEvent) => {
  return {
    type: actionTypes.CONVERSION_EVENT,
    conversion_event: conversionEvent
  }
}

export const conversions = (conversionEvents) => {
  return {
    type: actionTypes.ALL_CONVERSION_EVENTS,
    conversion_events: conversionEvents
  }
}

export const createUpdateConversion = (conversion_event, userId, position) => {
  return dispatch => {
    axios.post(process.env.REACT_APP_NODE_API + "admin/messages", {
      conversion_event: conversion_event,
      user_id: userId,
      position: position
    })
    .then(conversionEvent => {
      dispatch(conversion(conversionEvent.data));
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}

export const getConversions = (userId) => {
  return dispatch => {
    axios.post(process.env.REACT_APP_NODE_API + "admin/get-messages", {
      user_id: userId //change to get request
    })
    .then(conversionEvents => {
      dispatch(conversions(conversionEvents.data));
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}
