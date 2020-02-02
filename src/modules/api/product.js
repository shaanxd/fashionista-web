import { GET, POST } from './core';

export const getSearchKeywords = keyword => {
  const endpoint = `products/search/${keyword}?page=0&size=3`;
  return GET(endpoint);
};

export const getProductDetails = id => {
  const endpoint = `products/product/${id}`;
  return GET(endpoint);
};

export const searchProductTags = string => {
  const endpoint = `tags/search-tag/${string}`;
  return GET(endpoint);
};

export const addReview = (reviewData, productId, authToken) => {
  const endpoint = `products/add-review/${productId}`;
  return POST(endpoint, reviewData, authToken);
};

export const getReview = (id, value) => {
  const endpoint = `products/reviews/${id}?page=${value}&size=3`;
  return GET(endpoint);
};
