import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './SideDrawer.module.css';
import { logoutUser } from '../../actions/auth';
import { IoIosClose } from 'react-icons/io';

const SideDrawer = props => {
  let drawerStyles = props.isOpen ? [styles.side__drawer, styles.open].join(' ') : styles.side__drawer;
  const { auth } = props.auth;

  const handleLoginClick = () => {
    props.history.push('/signin');
    props.drawerClickHandler();
  };

  const handleSignupClick = () => {
    props.history.push('/signup');
    props.drawerClickHandler();
  };

  const handleLogoutClick = () => {
    props.logout();
    props.drawerClickHandler();
  };

  const handleHomeClick = () => {
    props.history.push('/');
    props.drawerClickHandler();
  };

  const handleProductsClick = () => {
    props.history.push('/products');
    props.drawerClickHandler();
  };

  const handleOrdersClick = () => {
    props.history.push('/orders');
    props.drawerClickHandler();
  };

  const renderUnauthRoutes = () => (
    <div className={styles.list__div}>
      <div className={styles.list__item} onClick={handleLoginClick}>
        <span>Login</span>
      </div>
      <div className={styles.list__item} onClick={handleSignupClick}>
        <span>Signup</span>
      </div>
    </div>
  );
  const renderAuthRoutes = () => (
    <div className={styles.list__div}>
      <div className={styles.list__item} onClick={handleHomeClick}>
        <span>Home</span>
      </div>
      <div className={styles.list__item} onClick={handleProductsClick}>
        <span>Products</span>
      </div>
      <div className={styles.list__item} onClick={handleOrdersClick}>
        <span>Orders</span>
      </div>
      <div className={styles.list__item} onClick={handleLogoutClick}>
        <span>Logout</span>
      </div>
    </div>
  );

  const navigationRoutes = auth ? renderAuthRoutes() : renderUnauthRoutes();
  return (
    <div className={drawerStyles}>
      <div className={styles.parent__div}>
        <div className={styles.child__div}>
          <div className={styles.close__container}>
            <button className={styles.close__button} onClick={props.drawerClickHandler}>
              <IoIosClose size={20} />
              <span>CLOSE</span>
            </button>
          </div>
          <div className={styles.flex__div}>
            <span>Fashionista</span>
          </div>
          {navigationRoutes}
          <div className={styles.flex__div} />
        </div>
        <div className={styles.absolute__div} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logoutUser());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideDrawer));
