import { GET } from './core';

export const getSearchKeywords = keyword => {
  const endpoint = `products/search/${keyword}?page=0&size=3`;
  return GET(endpoint);
};
