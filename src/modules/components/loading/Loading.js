import React from 'react';
import { PulseLoader } from 'react-spinners';

import styles from './Loading.module.css';

const Loading = props => {
  return (
    <div className={styles.main__div}>
      <PulseLoader size={30} color={'#3ad4d6'} loading />
      <span className={styles.loading__text}>{props.text}</span>
    </div>
  );
};

export default Loading;
