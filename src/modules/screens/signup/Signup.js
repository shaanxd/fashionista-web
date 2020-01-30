import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { PasswordInput, AppInput, AppButton } from '../../components';
import { useMergedState } from '../../utils/useMergedState';
import { postSignup } from '../../api/auth';
import { authSuccess } from '../../actions/auth';

import styles from './Signup.module.css';

const Signup = props => {
  const [state, setState] = useMergedState({
    signupLoading: false,
    signupError: null
  });

  useEffect(() => {
    if (props.auth) {
      props.history.push('/');
    }
  }, [props.auth, props.history]);

  const { signupLoading, signupError } = state;

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
            return (
              <Form className={styles.signup__form}>
                <span className={styles.form__header}>
                  Hello there, let's sign up!
                </span>
                <div className={styles.form__name_parent}>
                  <AppInput
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    loading={signupLoading}
                  />
                  <AppInput
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    loading={signupLoading}
                  />
                </div>
                <AppInput
                  type="text"
                  name="email"
                  placeholder="Email address"
                  loading={signupLoading}
                />
                <PasswordInput
                  name="password"
                  placeholder="Password"
                  loading={signupLoading}
                />
                <PasswordInput
                  name="confirmPassword"
                  placeholder="Confirm password"
                  loading={signupLoading}
                />
                <div className={styles.button__container}>
                  <AppButton
                    type="submit"
                    text="Sign in"
                    loading={signupLoading}
                  />
                </div>
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
