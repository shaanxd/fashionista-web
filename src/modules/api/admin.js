import { FDPOST } from './core';

export const createTag = (tagData, authToken) => {
  const endpoint = 'admin/create-tag';
  return FDPOST(endpoint, tagData, authToken);
};

export const createProduct = (productData, authToken) => {
  const endpoint = 'admin/create-product';
  return FDPOST(endpoint, productData, authToken);
};
