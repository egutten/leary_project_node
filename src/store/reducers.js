import * as actionTypes from './actionTypes';
import {updateObject} from '../shared/utility';

const initialState = {
  userId: null
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    userId: action.userId
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    userId: null
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
