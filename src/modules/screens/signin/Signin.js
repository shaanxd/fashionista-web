import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { Icomoon, Loading } from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { postSignin } from '../../api/auth';

import styles from './Signin.module.css';
import { authSuccess } from '../../actions/auth';
import { withRouter } from 'react-router-dom';

const Signin = props => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useMergedState({
    loginLoading: false,
    loginError: null
  });

  useEffect(() => {
    if (props.auth) {
      props.history.push('/');
    }
  }, [props.auth, props.history]);

  const { loginLoading, loginError } = state;

  const handlePasswordVisible = () => {
    setVisible(prevVisible => !prevVisible);
  };

  const handleSigninClick = async (values, { setSubmitting }) => {
    const { email, password } = values;
    try {
      setState({ loginError: null, loginLoading: true });
      const result = await postSignin(email, password);
      props.authSuccess(result);
    } catch (err) {
      setState({ loginLoading: false, loginError: err });
    }
  };

  const passwordParams = visible
    ? { type: 'text', icon: 'eye-blocked' }
    : { type: 'password', icon: 'eye' };

  const renderLoading = () => {
    return <Loading text={'Logging in'} />;
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.content__div}>
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
            return loginLoading ? (
              renderLoading()
            ) : (
              <Form className={styles.login__form}>
                <span className={styles.form__header}>
                  Welcome back, let's get you logged in.
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
                {loginError && loginError.message && (
                  <label className={styles.form__error_main}>
                    {loginError.message}
                  </label>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className={styles.image} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
