import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';

import { AppButton, AppInput, PasswordInput } from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { postSignin } from '../../api/auth';
import { authSuccess } from '../../actions/auth';

import styles from './Signin.module.css';

const Signin = props => {
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
            return (
              <Form className={styles.login__form}>
                <span className={styles.form__header}>
                  Welcome back, let's get you logged in.
                </span>
                <AppInput
                  type="text"
                  name="email"
                  placeholder="Email address"
                  loading={loginLoading}
                />
                <PasswordInput
                  name="password"
                  placeholder="Password"
                  loading={loginLoading}
                />
                <AppButton
                  type="submit"
                  text="Sign in"
                  loading={loginLoading}
                  containerStyle={{ marginTop: '5px' }}
                />
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
