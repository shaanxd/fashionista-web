import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import * as Yup from 'yup';

import { Loading } from '../../components';
import { useMergedState } from '../../utils/useMergedState';

import styles from './Signup.module.css';
import { postSignup } from '../../api/auth';
import { authSuccess } from '../../actions/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Signup = props => {
  const [state, setState] = useMergedState({
    passwordVisible: false,
    confirmVisible: false,
    signupLoading: false,
    signupError: null
  });

  useEffect(() => {
    if (props.auth) {
      props.history.push('/');
    }
  }, [props.auth, props.history]);

  const { passwordVisible, confirmVisible, signupLoading, signupError } = state;

  const handleSignupSubmit = async (values, { setSubmitting }) => {
    const { firstname, lastname, ...rest } = values;
    const fullName = `${firstname} ${lastname}`;
    try {
      setState({ signupError: null, signupLoading: true });
      const result = await postSignup({ fullName, ...rest });
      props.authSuccess(result);
    } catch (err) {
      setState({ signupError: err, signupLoading: false });
    }
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

  const renderLoading = () => {
    return <Loading text="Signing up" />;
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.image} />
      <div className={styles.content__div}>
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
            return signupLoading ? (
              renderLoading()
            ) : (
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
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter Password"
                  />
                  <button
                    onClick={handlePasswordVisible}
                    className={styles.form__button_hide}
                    type="button"
                  >
                    {passwordVisible ? (
                      <FiEyeOff color="#888888" size="20px" />
                    ) : (
                      <FiEye color="#888888" size="20px" />
                    )}
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
                    type={confirmVisible ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                  <button
                    onClick={handleConfirmPasswordVisible}
                    className={styles.form__button_hide}
                    type="button"
                  >
                    {confirmVisible ? (
                      <FiEyeOff color="#888888" size="20px" />
                    ) : (
                      <FiEye color="#888888" size="20px" />
                    )}
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
                {signupError && signupError.message && (
                  <label className={styles.form__error_main}>
                    {signupError.message}
                  </label>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { auth } }) => {
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authSuccess: userData => {
      dispatch(authSuccess(userData));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
