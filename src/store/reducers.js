import * as actionTypes from './actionTypes';
import {updateObject} from '../shared/utility';

const initialState = {
  sessionId: null,
  email: null,
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    sessionId: action.sessionId,
    email: action.email
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {sessionId: null});
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
