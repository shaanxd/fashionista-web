export const authSuccess = userData => {
  return {
    type: AUTH_SUCCESS,
    payload: userData
  };
};

export const checkAuthTimeout = payload => {
  return {
    type: CHECK_AUTH_TIMEOUT,
    payload
  };
};

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const CHECK_AUTH_TIMEOUT = 'CHECK_AUTH_TIMEOUT';
