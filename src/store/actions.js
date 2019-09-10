import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSuccess = (sessionId, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    sessionId: sessionId,
    email: email
  };
};

export const logout = () => {
  axios.get("http://localhost:8080/logout")
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err.message);
  });
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const auth = (email, password) => {
  return dispatch => {
    const authData = {
      email: email,
      password: password
    };
    axios.post("http://localhost:8080/login", authData)
    .then(response => {
      dispatch(authSuccess(response.data.sessionId, response.data.email));
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}