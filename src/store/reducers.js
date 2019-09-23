import * as actionTypes from './actionTypes';
import {updateObject} from '../shared/utility';

const initialState = {
  userId: null,
  position: "right",
  conversion_event_id: null,
  error_message: null
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

const savePosition = (state, action) => {
  return updateObject(state, {
    position: action.position
  })
}

const conversionId = (state, action) => {
  return updateObject(state, {
    conversion_event_id: action.id
  })
}

const reducer  = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.AUTH_FAILURE: return authFailure(state, action);
    case actionTypes.SAVE_POSITION: return savePosition(state, action);
    case actionTypes.CONVERSION_ID: return conversionId(state, action);
    default:
      return state;
  }
};

export default reducer;
