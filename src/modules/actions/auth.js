export const authSuccess = userData => {
  return {
    type: AUTH_SUCCESS,
    payload: userData
  };
};

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
