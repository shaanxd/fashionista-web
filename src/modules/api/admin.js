import { FDPOST, GET, POST } from './core';

export const createTag = (tagData, authToken) => {
  const endpoint = 'admin/create-tag';
  return FDPOST(endpoint, tagData, authToken);
};

export const createProduct = (productData, authToken) => {
  const endpoint = 'admin/create-product';
  return FDPOST(endpoint, productData, authToken);
};

export const getAllInquiries = (authToken, value) => {
  const endpoint = `admin/all-inquiries?page=${value}&size=10&sort=updatedAt,desc`;
  return GET(endpoint, authToken);
};

export const addReply = (id, replyData, authToken) => {
  const endpoint = `products/add-reply/${id}`;
  return POST(endpoint, replyData, authToken);
};
