import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home, Signin, Signout, Signup } from './screens';
import { Toolbar, SideDrawer, Backdrop, Loading } from './components';

import 'antd/dist/antd.css';
import styles from './Root.module.css';
import { checkAuthValid } from './actions/auth';
import { connect } from 'react-redux';

const Root = props => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    props.checkAuthValid();
    // eslint-disable-next-line
  }, []);

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
