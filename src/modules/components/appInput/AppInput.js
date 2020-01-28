import React from 'react';

import styles from './AppInput.module.css';
import { Field, ErrorMessage } from 'formik';

const AppInput = props => {
  const { name, type, placeholder } = props;
  return (
    <div className={styles.form__group}>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className={styles.form__input}
      />
      <ErrorMessage name={name}>
        {message => <label className={styles.form__error}>{message}</label>}
      </ErrorMessage>
    </div>
  );
};

export default AppInput;
