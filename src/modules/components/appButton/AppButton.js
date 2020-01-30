import React from 'react';
import { PulseLoader } from 'react-spinners';

import styles from './AppButton.module.css';

const AppButton = props => {
  return (
    <div className={styles.button__container}>
      <button
        className={styles.button}
        disabled={props.loading}
        onClick={props.onClick ? props.onClick : null}
        type={props.type}
      >
        {props.loading ? (
          <PulseLoader size={5} color={'#FFFFFF'} loading />
        ) : (
          props.text.toUpperCase()
        )}
      </button>
    </div>
  );
};

export default AppButton;
