import React from 'react';
import { PulseLoader } from 'react-spinners';

import styles from './Loading.module.css';

const Loading = props => {
  return (
    <div className={styles.main__div}>
      <PulseLoader size={10} color={'black'} loading />
      <span className={styles.loading__text}>{props.text}</span>
    </div>
  );
};

export default Loading;
