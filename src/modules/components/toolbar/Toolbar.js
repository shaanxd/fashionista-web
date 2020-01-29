import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { DrawerToggleButton } from '../';

import './Toolbar.css';
import { logoutUser } from '../../actions/auth';
import { ROLES } from '../../constants/types';

const Toolbar = props => {
  const { auth } = props;

  const handleLoginClick = () => {
    props.history.push('/signin');
  };

  const handleSignupClick = () => {
    props.history.push('/signup');
  };

  const handleHomeClick = () => {
    props.history.push('/');
  };

  const handleLogoutClick = () => {
    props.logout();
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

  const renderUserRoutes = () => (
    <ul>
      <li>
        <span className="toolbar__navigation-link" onClick={handleLogoutClick}>
          Signout
        </span>
      </li>
    </ul>
  );

  const renderAdminRoutes = () => (
    <ul>
      <li>
        <span className="toolbar__navigation-link" onClick={handleLogoutClick}>
          Signout
        </span>
      </li>
    </ul>
  );

  const navigationRoutes = !auth
    ? renderUnauthRoutes()
    : auth.role === ROLES.ROLE_ADMIN
    ? renderAdminRoutes()
    : renderUserRoutes();

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
        {auth && auth.role === ROLES.ROLE_USER && (
          <div className="toolbar__cart-button">
            <DrawerToggleButton
              isCart
              onClick={props.cartClickHandler}
              value={props.numberOfProducts}
            />
          </div>
        )}
      </nav>
    </header>
  );
};

const mapStateToProps = ({ auth: { auth } }) => {
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logoutUser());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Toolbar)
);
