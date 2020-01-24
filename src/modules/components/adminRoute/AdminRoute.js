import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ROLES } from '../../constants/roles';

const AdminRoute = props => {
  const { auth, component: Component, ...rest } = props;

  return auth && auth.role === ROLES.ROLE_ADMIN ? (
    <Component {...rest} />
  ) : (
    <Redirect to="/" />
  );
};

const mapStateToProps = ({ auth: { auth } }) => {
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoute);
