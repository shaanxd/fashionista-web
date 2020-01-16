import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home, Signin, Signout, Signup } from './screens';
import { Toolbar, SideDrawer, Backdrop } from './components';

import 'antd/dist/antd.css';
import styles from './Root.module.css';

const Root = props => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawerToggle = () => {
    setDrawerOpen(prevDrawerOpen => !prevDrawerOpen);
  };

  const backdropToggle = () => {
    setDrawerOpen(false);
  };

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

export default Root;
