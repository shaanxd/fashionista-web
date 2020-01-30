import createReducer from '../utils/createReducer';
import {
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  GET_CART,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  DELETE_CART,
  CHECKOUT_SUCCESS
} from '../actions/cart';

const initialState = {
  cart: {
    numberOfItems: 0,
    totalPrice: 0,
    items: []
  },
  cartLoading: false,
  cartError: null,

  addLoading: false,
  addError: null
};

const addToCart = (state = initialState, { type, payload }) => {
  return {
    ...state,
    addLoading: true,
    addError: null
  };
};

const addToCartSuccess = (state = initialState, { type, payload }) => {
  return {
    ...state,
    cart: { ...payload },
    addLoading: false
  };
};

const addToCartFailure = (state = initialState, { type, payload }) => {
  return {
    ...state,
    addLoading: false,
    addError: payload
  };
};

const getCart = (state = initialState, { type }) => {
  return {
    ...state,
    cartLoading: true,
    cartError: null
  };
};

const getCartSuccess = (state = initialState, { type, payload }) => {
  return {
    ...state,
    cart: { ...payload },
    cartLoading: false
  };
};

const getCartFailure = (state = initialState, { type, payload }) => {
  return {
    ...state,
    cartLoading: false,
    cartError: payload
  };
};

const deleteCart = (state = initialState, { type, payload }) => {
  return {
    ...state,
    cartLoading: true,
    cartError: null
  };
};

const checkoutSuccess = (state = initialState, { type, payload }) => {
  return {
    ...state,
    cart: {
      ...initialState.cart
    }
  };
};

export const cart = createReducer(initialState, {
  [ADD_TO_CART]: addToCart,
  [ADD_TO_CART_SUCCESS]: addToCartSuccess,
  [ADD_TO_CART_FAILURE]: addToCartFailure,

  [GET_CART]: getCart,
  [GET_CART_SUCCESS]: getCartSuccess,
  [GET_CART_FAILURE]: getCartFailure,

  [DELETE_CART]: deleteCart,

  [CHECKOUT_SUCCESS]: checkoutSuccess
});
