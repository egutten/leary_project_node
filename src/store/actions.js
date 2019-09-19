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
