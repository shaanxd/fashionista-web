import React from 'react';
import { connect } from 'react-redux';
import Home from '../home/Home';
import AdminHome from '../adminHome/AdminHome';
import { ROLES } from '../../constants/roles';

const AuthHome = props => {
  return props.auth && props.auth.role === ROLES.ROLE_ADMIN ? (
    <AdminHome />
  ) : (
    <Home />
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
