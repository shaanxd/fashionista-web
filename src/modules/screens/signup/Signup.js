import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Icomoon } from '../../components';
import { useMergedState } from '../../utils/useMergedState';

import styles from './Signup.module.css';

const Signup = props => {
  const [state, setState] = useMergedState({
    passwordVisible: false,
    confirmVisible: false
  });

  const { passwordVisible, confirmVisible } = state;

  const handleSignupSubmit = () => {
    console.log('Sign up');
  };

  const handlePasswordVisible = () => {
    setState(prevState => {
      return { ...prevState, passwordVisible: !prevState.passwordVisible };
    });
  };

  const handleConfirmPasswordVisible = () => {
    setState(prevState => {
      return { ...prevState, confirmVisible: !prevState.confirmVisible };
    });
  };

  const passwordParams = passwordVisible
    ? { type: 'text', icon: 'eye-blocked' }
    : { type: 'password', icon: 'eye' };
  const confirmParams = confirmVisible
    ? { type: 'text', icon: 'eye-blocked' }
    : { type: 'password', icon: 'eye' };

  return (
    <div className={styles.main__div}>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          password: '',
          email: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().required('Firstname is required'),
          lastname: Yup.string().required('Lastname is required'),
          email: Yup.string()
            .email('Invalid Email')
            .required('Email is required'),
          password: Yup.string()
            .min(5, 'Password is too short')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation is required')
        })}
        onSubmit={handleSignupSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form className={styles.signup__form}>
              <span className={styles.form__header}>
                Hello there, let's sign up!
              </span>
              <div className={styles.form__name_parent}>
                <div className={styles.form__name_child}>
                  <Field
                    className={styles.form__name_input}
                    type="text"
                    name="firstname"
                    placeholder="Enter Firstname"
                  />
                  <ErrorMessage name="firstname">
                    {message => (
                      <label className={styles.form__error}>{message}</label>
                    )}
                  </ErrorMessage>
                </div>
                <span className={styles.form__name_space} />
                <div className={styles.form__name_child}>
                  <Field
                    className={styles.form__name_input}
                    type="text"
                    name="lastname"
                    placeholder="Enter Lastname"
                  />
                  <ErrorMessage name="lastname">
                    {message => (
                      <label className={styles.form__error}>{message}</label>
                    )}
                  </ErrorMessage>
                </div>
              </div>
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
              <div className={styles.form__input_parent}>
                <Field
                  className={styles.form__input_nested}
                  type={confirmParams.type}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <button
                  onClick={handleConfirmPasswordVisible}
                  className={styles.form__button_hide}
                  type="button"
                >
                  <Icomoon
                    color="#888888"
                    icon={confirmParams.icon}
                    size={20}
                  />
                </button>
              </div>
              <ErrorMessage name="confirmPassword">
                {message => (
                  <label className={styles.form__error}>{message}</label>
                )}
              </ErrorMessage>

              <button
                className={styles.form__submit}
                type="submit"
                disabled={false}
              >
                Signup
              </button>
              {'xxx' && (
                <label className={styles.form__error_main}>{'xxx'}</label>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Signup;
