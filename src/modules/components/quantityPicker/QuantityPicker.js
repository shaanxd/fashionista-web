import React from 'react';

import styles from './QuantityPicker.module.css';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const QuantityPicker = props => {
  const { value } = props;

  const handleOnDecrease = () => {
    props.onChange('quantity', value - 1);
  };

  const handleOnIncrease = () => {
    props.onChange('quantity', value + 1);
  };
  return (
    <div className={styles.picker__div}>
      <div className={styles.inner__div}>
        <button
          type="button"
          onClick={handleOnDecrease}
          disabled={value <= 1}
          className={styles.picker__button}
        >
          <AiOutlineMinus size={15} />
        </button>
        <span className={styles.picker__label}>{value}</span>
        <button
          type="button"
          onClick={handleOnIncrease}
          disabled={value > 4}
          className={styles.picker__button}
        >
          <AiOutlinePlus size={15} />
        </button>
      </div>
    </div>
  );
};

export default QuantityPicker;
