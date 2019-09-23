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

export const logout = () => {
  return dispatch => {
    axios.get("http://localhost:8080/logout")
    .then(response => {
      dispatch(authLogout());
    })
    .catch(err => {
      console.log(err.message);
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
      console.log(err.message);
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
    axios.post("http://localhost:8080/ce", {
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
