import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home, Signin, Signout, Signup } from './screens';

import styles from './Root.module.css';

const Root = props => {
  return (
    <div className={styles.root}>
      <Router>
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
