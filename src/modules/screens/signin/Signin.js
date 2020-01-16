import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import background from '../../static/img/signin-background.jpg';
import { Icomoon } from '../../components';

import styles from './Signin.module.css';

const Signin = props => {
  const [visible, setVisible] = useState(false);

  const handlePasswordVisible = () => {
    setVisible(prevVisible => !prevVisible);
  };

  const handleSignupClick = () => {
    console.log('Sign up!');
  };

  const handleSigninClick = () => {
    console.log('Sign in!');
  };

  const passwordParams = visible
    ? { type: 'text', icon: 'eye-blocked' }
    : { type: 'password', icon: 'eye' };

  return (
    <div className={styles.main__div}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
          password: Yup.string().required('Password is required')
        })}
        onSubmit={handleSigninClick}
      >
        {({ isSubmitting }) => {
          return (
            <Form className={styles.login__form}>
              <span className={styles.form__header}>
                Welcome back!, let's get you logged in!
              </span>

              <Field
                className={styles.form__input}
                type="email"
                name="email"
                placeholder="Enter Email"
              />
              <ErrorMessage name="email">
                {message => (
                  <label className={styles.form__error}>{message}</label>
                )}
              </ErrorMessage>
              <div className={styles.form__input_parent}>
                <Field
                  className={styles.form__input_nested}
                  type={passwordParams.type}
                  name="password"
                  placeholder="Enter Password"
                />
                <button
                  onClick={handlePasswordVisible}
                  className={styles.form__button_hide}
                  type="button"
                >
                  <Icomoon
                    color="#888888"
                    icon={passwordParams.icon}
                    size={20}
                  />
                </button>
              </div>
              <ErrorMessage name="password">
                {message => (
                  <label className={styles.form__error}>{message}</label>
                )}
              </ErrorMessage>
              <button
                className={styles.form__submit}
                type="submit"
                disabled={false}
              >
                Login
              </button>
              {'xxx' && (
                <label className={styles.form__error_main}>{'xxx'}</label>
              )}
            </Form>
          );
        }}
      </Formik>
      <div className={styles.image} />
    </div>
  );
};

export default Signin;
