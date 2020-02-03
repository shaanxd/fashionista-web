import React from 'react';
import { Redirect } from 'react-router-dom';

const AuthRoute = props => {
  const { auth, component: Component, role, ...rest } = props;

  return auth && auth.role === role ? (
    <Component {...rest} />
  ) : (
    <Redirect to="/" />
  );
};

export default AuthRoute;
