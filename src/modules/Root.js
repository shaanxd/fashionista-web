import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Home,
  Signin,
  Signout,
  Signup,
  Product,
  AddTag,
  AddProduct
} from './screens';
import {
  Toolbar,
  SideDrawer,
  Backdrop,
  Loading,
  AdminRoute
} from './components';
import { checkAuthValid } from './actions/auth';
import { usePrevious } from './utils/useMergedState';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'antd/dist/antd.css';
import styles from './Root.module.css';

const Root = props => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { auth: currentAuth } = props;

  const prevAuth = usePrevious(currentAuth);

  useEffect(() => {
    props.checkAuthValid();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!prevAuth && currentAuth) {
    }
  }, [currentAuth, prevAuth]);

  const drawerToggle = () => {
    setDrawerOpen(prevDrawerOpen => !prevDrawerOpen);
  };

  const backdropToggle = () => {
    setDrawerOpen(false);
  };

  const renderLoading = () => {
    return <Loading text="Loading" />;
  };

  const renderLogout = () => {
    return <Loading text="Logging out" />;
  };

  const renderContent = () => {
    return (
      <div className={styles.root}>
        <Router>
          <Toolbar drawerClickHandler={drawerToggle} />
          <SideDrawer isOpen={drawerOpen} />
          {drawerOpen && <Backdrop onClick={backdropToggle} />}
          <main className={styles.main}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/signin">
                <Signin />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/signout">
                <Signout />
              </Route>
              <Route exact path="/product/:id">
                <Product />
              </Route>
              <Route exact path="/add-tag">
                <AdminRoute component={AddTag} />
              </Route>
              <Route exact path="/add-product">
                <AdminRoute component={AddProduct} />
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    );
  };

  return props.loading
    ? renderLoading()
    : props.logoutLoading
    ? renderLogout()
    : renderContent();
};

const mapStateToProps = ({ auth }) => {
  return {
    auth: auth.auth,
    loading: auth.checkAuthLoading,
    logoutLoading: auth.logoutLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthValid: () => {
      dispatch(checkAuthValid());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
