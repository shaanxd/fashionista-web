import React from 'react';
import { PulseLoader } from 'react-spinners';

import styles from './AppButton.module.css';

const AppButton = props => {
  const { containerStyle, loading, onClick, type, text } = props;
  return (
    <div className={styles.button__container} style={containerStyle}>
      <button
        className={styles.button}
        disabled={loading}
        onClick={onClick ? onClick : null}
        type={type}
      >
        {loading ? (
          <PulseLoader size={5} color={'#FFFFFF'} loading />
        ) : (
          text.toUpperCase()
        )}
      </button>
    </div>
  );
};

export default AppButton;
