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
    axios.get("http://localhost:8080/logout")
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
    axios.post("http://localhost:8080/login", authData)
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

export const savePosition = (position) => {
  return {
    type: actionTypes.SAVE_POSITION,
    position: position
  }
}

export const conversionId = (id) => {
  return {
    type: actionTypes.CONVERSION_ID,
    id: id
  }
}

export const getConversionId = (conversion_event, userId) => {
  return dispatch => {
    axios.post("http://localhost:8080/create-update-conversion-events", {
      conversion_event: conversion_event,
      user_id: userId
    })
    .then(response => {
      dispatch(conversionId(response.data));
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}
