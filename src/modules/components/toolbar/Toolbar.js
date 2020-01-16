import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { DrawerToggleButton } from '../';

import './Toolbar.css';

const Toolbar = props => {
  const { authDetails } = props.auth;

  const handleLoginClick = () => {
    props.history.push('/signin');
  };

  const handleSignupClick = () => {
    props.history.push('/signup');
  };

  const handleHomeClick = () => {
    props.history.push('/');
  };

  const renderUnauthRoutes = () => {
    return (
      <ul>
        <li>
          <span
            className={
              props.location.pathname === '/signin'
                ? 'toolbar__navigation-link active'
                : 'toolbar__navigation-link'
            }
            onClick={handleLoginClick}
          >
            Signin
          </span>
        </li>
        <li>
          <span
            className={
              props.location.pathname === '/signup'
                ? 'toolbar__navigation-link active'
                : 'toolbar__navigation-link'
            }
            onClick={handleSignupClick}
          >
            Signup
          </span>
        </li>
      </ul>
    );
  };

  const renderAuthRoutes = () => <ul></ul>;

  const navigationRoutes = authDetails
    ? renderAuthRoutes()
    : renderUnauthRoutes();
  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <DrawerToggleButton onClick={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo">
          <span onClick={handleHomeClick}>
            <span className="toolbar__logo-dark">Fashion</span>
            <span className="toolbar__logo-light">ista</span>
          </span>
        </div>
        <div className="spacer" />
        <div className="toolbar__navigation-items">{navigationRoutes}</div>
      </nav>
    </header>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Toolbar)
);
