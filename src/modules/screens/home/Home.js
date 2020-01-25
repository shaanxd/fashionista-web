import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { HomeSearch } from '../../components';

import styles from './Home.module.css';

const Home = props => {
  return (
    <div className={styles.main__div}>
      <HomeSearch navigate={props.history.push} />
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
