import React from 'react';
import MaskedInput from 'react-text-mask';
import { Field, ErrorMessage } from 'formik';

import styles from './MaskInput.module.css';

const MaskInput = props => {
  return (
    <div className={styles.form__group}>
      <Field name={props.name}>
        {({ field }) => (
          <MaskedInput
            mask={props.mask}
            {...field}
            placeholderChar={props.placeholderChar}
            placeholder={props.placeholder}
            className={styles.form__input}
          />
        )}
      </Field>
      <ErrorMessage name={props.name}>
        {message => <label className={styles.form__error}>{message}</label>}
      </ErrorMessage>
    </div>
  );
};

export default MaskInput;
