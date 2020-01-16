import createReducer from '../utils/createReducer';
import { AUTH_SUCCESS } from '../actions/auth';

const initialState = {
  auth: null
};

const authSuccess = (state = initialState, { type, payload }) => {
  return {
    ...state,
    auth: payload
  };
};

export const auth = createReducer(initialState, {
  [AUTH_SUCCESS]: authSuccess
});
