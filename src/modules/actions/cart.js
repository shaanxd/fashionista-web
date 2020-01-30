export const addToCart = payload => {
  return {
    type: ADD_TO_CART,
    payload
  };
};

export const addToCartSuccess = payload => {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload
  };
};

export const addToCartFailure = payload => {
  return {
    type: ADD_TO_CART_FAILURE,
    payload
  };
};

export const getCart = () => {
  return {
    type: GET_CART,
    payload: {}
  };
};

export const getCartSuccess = payload => {
  return {
    type: GET_CART_SUCCESS,
    payload
  };
};

export const getCartFailure = payload => {
  return {
    type: GET_CART_FAILURE,
    payload
  };
};

export const deleteCart = payload => {
  return {
    type: DELETE_CART,
    payload
  };
};

export const checkoutSuccess = payload => {
  return {
    type: CHECKOUT_SUCCESS,
    payload
  };
};

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const GET_CART = 'GET_CART';
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS';
export const GET_CART_FAILURE = 'GET_CART_FAILURE';

export const DELETE_CART = 'DELETE_CART';

export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
