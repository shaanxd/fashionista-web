import createReducer from '../utils/createReducer';
import { AUTH_SUCCESS, CHECK_AUTH_VALID_SUCCESS } from '../actions/auth';

const initialState = {
  auth: null,
  checkAuthLoading: true
};

const authSuccess = (state = initialState, { type, payload }) => {
  return {
    ...state,
    auth: payload
  };
};

const checkAuthValidSuccess = (state = initialState, { type, payload }) => {
  return {
    ...state,
    auth: payload,
    checkAuthLoading: false
  };
};

export const auth = createReducer(initialState, {
  [AUTH_SUCCESS]: authSuccess,
  [CHECK_AUTH_VALID_SUCCESS]: checkAuthValidSuccess
});
