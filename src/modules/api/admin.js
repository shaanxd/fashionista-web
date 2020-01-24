import { FDPOST } from './core';

export const createTag = (tagData, authToken) => {
  const endpoint = 'admin/create-tag';
  return FDPOST(endpoint, tagData, authToken);
};
