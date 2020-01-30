import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { AppInput, AppButton } from '../';

import styles from './ShippingInput.module.css';

const ShippingInput = props => {
  return (
    <div className={styles.details__container}>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          address: '',
          city: '',
          country: ''
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().required('First name is required'),
          lastname: Yup.string().required('Last name is required'),
          address: Yup.string().required('Address is required.'),
          city: Yup.string().required('City is required.'),
          country: Yup.string().required('Country is required')
        })}
        onSubmit={props.onSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form className={styles.form__div}>
              <div className={styles.name__div}>
                <AppInput
                  name="firstname"
                  placeholder="First name"
                  type="text"
                />
                <AppInput name="lastname" placeholder="Last name" type="text" />
              </div>
              <AppInput name="address" placeholder="Address" type="text" />
              <AppInput name="city" placeholder="City" type="text" />
              <AppInput
                name="country"
                placeholder="Country/Region"
                type="text"
              />
              <div className={styles.button__container}>
                <AppButton
                  text="Proceed"
                  type="submit"
                  loading={props.loading}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ShippingInput;
