import * as actionTypes from './actionTypes';
import axios from 'axios';
// import Cookies from 'universal-cookie';
// 
// const cookies = new Cookies();

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
  // return dispatch => {
  //   axios.get("http://localhost:8080/logout")
  //   .then(response => {
  //     cookies.remove('sessionId', { path: '/', domain: "localhost"});
  //     dispatch(authLogout());
  //   })
  //   .catch(err => {
  //     console.log(err.message);
  //   });
  // }
};

export const auth = (email, password) => {
  return dispatch => {
    const authData = {
      email: email,
      password: password
    };
    axios.post("http://localhost:8080/login", authData)
    .then(response => {
      const expirationDate = response.data.expiration;
      localStorage.setItem('token', response.data.userId);
      localStorage.setItem('expirationDate', expirationDate)
      // cookies.set('sessionId', response.data.sessionId, {path: '/', expires: new Date(Date.now()+2592000)});
      dispatch(authSuccess(response.data.userId));
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}
