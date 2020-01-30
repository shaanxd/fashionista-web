import React from 'react';
import InputMask from 'react-input-mask';
import { Field, ErrorMessage } from 'formik';

import styles from './MaskInput.module.css';

const MaskInput = props => {
  return (
    <div className={styles.form__group}>
      <Field name={props.name}>
        {({ field }) => (
          <InputMask
            mask={props.mask}
            {...field}
            placeholder={props.placeholder}
            className={styles.form__input}
            alwaysShowMask={false}
            maskChar={props.maskChar}
          ></InputMask>
        )}
      </Field>
      <ErrorMessage name={props.name}>
        {message => <label className={styles.form__error}>{message}</label>}
      </ErrorMessage>
    </div>
  );
};

export default MaskInput;
