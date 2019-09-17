import * as actionTypes from './actionTypes';
import {updateObject} from '../shared/utility';
import Cookies from 'universal-cookie';

const cookies = new Cookies();



const initialState = {
  loggedIn: undefined,
  userId: null
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    loggedIn: cookies.get('sessionId'),
    userId: action.userId
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    loggedIn: cookies.get('sessionId')
  });
}

const reducer  = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
