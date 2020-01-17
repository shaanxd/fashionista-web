import { POST } from './core';

export const postSignin = (email, password) => {
  const endpoint = 'auth/login';
  return POST(endpoint, { email, password });
};

export const postSignup = userData => {
  const endpoint = 'auth/register';
  return POST(endpoint, { ...userData });
};
