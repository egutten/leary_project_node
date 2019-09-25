import * as actionTypes from './actionTypes';
import {updateObject} from '../shared/utility';

const initialState = {
  userId: null,
  // position: "right",
  // conversion_event_id: null,
  error_message: null,
  messages: []
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
};

const authFailure = (state, action) => {
  return updateObject(state, {
    error_message: action.message
  });
};

const conversionEvent = (state, action) => {
  return updateObject(state, {
    messages: state.messages.concat(action.conversion_event)
  });
};

const reducer  = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.AUTH_FAILURE: return authFailure(state, action);
    case actionTypes.CONVERSION_EVENT: return conversionEvent(state, action);
    default:
      return state;
  }
};

export default reducer;
