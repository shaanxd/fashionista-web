import React from 'react';
import { Radio, RadioGroup } from 'react-custom-radio-buttons';

import styles from './SizePicker.module.css';

const SizePicker = props => {
  const onChange = value => {
    props.onChange('size', value);
  };

  return (
    <RadioGroup containerStyle={styles.radio__div} onChange={onChange}>
      {props.options.map((option, index) => (
        <Radio
          key={index}
          value={option}
          render={({ isSelected }) => {
            const style = isSelected
              ? styles.radio__selected
              : styles.radio__empty;
            return (
              <button type="button" className={style}>
                {option}
              </button>
            );
          }}
        />
      ))}
    </RadioGroup>
  );
};

export default SizePicker;
