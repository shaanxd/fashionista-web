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

export const checkoutCart = (checkoutData, authToken) => {
  const endpoint = 'purchases/purchase-cart';
  return POST(endpoint, checkoutData, authToken);
};

export const getPurchases = (authToken, page) => {
  const endpoint = `purchases?page=${page}&size=3&sort=createdAt,desc`;
  return GET(endpoint, authToken);
};
