import { POST } from './core';

export const addToCart = (cartData, authToken) => {
  const endpoint = 'cart/add-product';
  return POST(endpoint, cartData, authToken);
};
