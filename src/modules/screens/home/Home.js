import React from 'react';
import { connect } from 'react-redux';
import UserHome from '../userHome/UserHome';
import Products from '../products/Products';
import { ROLES } from '../../constants/types';

const AuthHome = props => {
  return props.auth && props.auth.role === ROLES.ROLE_ADMIN ? (
    <Products />
  ) : (
    <UserHome />
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthHome);
