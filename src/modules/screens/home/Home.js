import React from 'react';
import { connect } from 'react-redux';
import UserHome from '../userHome/UserHome';
import AdminHome from '../adminHome/AdminHome';
import { ROLES } from '../../constants/types';

const AuthHome = props => {
  return props.auth && props.auth.role === ROLES.ROLE_ADMIN ? (
    <AdminHome />
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
