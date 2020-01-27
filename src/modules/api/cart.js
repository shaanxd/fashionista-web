import { POST, GET } from './core';

export const addToCart = (cartData, authToken) => {
  const endpoint = 'cart/add-product';
  return POST(endpoint, cartData, authToken);
};

export const getCart = authToken => {
  const endpoint = 'cart/';
  return GET(endpoint, authToken);
};

export const deleteCart = (cartId, authToken) => {
  const endpoint = `cart/delete-cart/${cartId}`;
  return POST(endpoint, {}, authToken);
};
