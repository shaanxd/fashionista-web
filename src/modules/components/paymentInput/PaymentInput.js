import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Radio, RadioGroup } from 'react-custom-radio-buttons';
import { Collapse } from 'react-collapse';
import { usePaymentInputs } from 'react-payment-inputs';

import { AppInput } from '../';

import styles from './PaymentInput.module.css';
import { PAYMENTS } from '../../constants/types';

const PaymentWrapperInput = props => {
  const { name, inputWrapperProps } = props;
  return (
    <div className={styles.input__div}>
      <Field name={props.name}>
        {({ field }) => (
          <input
            {...inputWrapperProps({
              onBlur: field.onBlur,
              onChange: field.onChange
            })}
            className={styles.form__input}
          />
        )}
      </Field>
      <ErrorMessage name={name}>
        {message => <label className={styles.form__error}>{message}</label>}
      </ErrorMessage>
    </div>
  );
};

const PaymentInput = props => {
  const {
    meta,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps
  } = usePaymentInputs();

  return (
    <div className={styles.details__container}>
      <Formik
        initialValues={{
          type: '',
          name: '',
          number: '',
          expirationDate: '',
          cvc: ''
        }}
        validationSchema={Yup.object().shape({
          type: Yup.string()
            .oneOf([PAYMENTS.CASH_ON_DELIVERY, PAYMENTS.CARD_PAYMENT])
            .required('Payment type should be selected'),
          name: Yup.string().when('type', {
            is: PAYMENTS.CARD_PAYMENT,
            then: Yup.string().required('Cardholder name is required')
          })
        })}
        validate={values => {
          let errors = {};
          if (values.type === PAYMENTS.CARD_PAYMENT) {
            if (meta.erroredInputs.cardNumber) {
              errors.number = meta.erroredInputs.cardNumber;
            }
            if (meta.erroredInputs.expiryDate) {
              errors.expirationDate = meta.erroredInputs.expiryDate;
            }
            if (meta.erroredInputs.cvc) {
              errors.cvc = meta.erroredInputs.cvc;
            }
          }
          return errors;
        }}
        onSubmit={props.onSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => {
          return (
            <Form className={styles.form__div}>
              <RadioGroup
                containerStyle={styles.radio__div}
                onChange={value => {
                  setFieldValue('type', value);
                }}
              >
                {Object.keys(PAYMENTS).map((option, index) => {
                  return (
                    <Radio
                      className={styles.radio}
                      key={index}
                      value={option}
                      render={({ isSelected }) => {
                        const style = isSelected
                          ? [styles.radio, styles.selected].join(' ')
                          : styles.radio;

                        return (
                          <button type="button" className={style}>
                            {option.replace(/_/g, ' ')}
                          </button>
                        );
                      }}
                    />
                  );
                })}
              </RadioGroup>
              <Collapse isOpened={values.type === PAYMENTS.CARD_PAYMENT}>
                {/* <svg {...getCardImageProps({ images })} /> */}
                <PaymentWrapperInput
                  name="number"
                  inputWrapperProps={getCardNumberProps}
                />
                <div className={styles.payment__nested}>
                  <PaymentWrapperInput
                    name="expirationDate"
                    inputWrapperProps={getExpiryDateProps}
                  />
                  <div className={styles.separator__div} />
                  <PaymentWrapperInput
                    name="cvc"
                    inputWrapperProps={getCVCProps}
                  />
                </div>
                <AppInput
                  name="name"
                  placeholder="Cardholder name"
                  type="text"
                />
              </Collapse>

              <div className={styles.nested__div}>
                <button
                  className={styles.submit__button}
                  type="button"
                  onClick={props.onPrevious}
                >
                  PREVIOUS
                </button>
                <button className={styles.submit__button} type="submit">
                  NEXT
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PaymentInput;
