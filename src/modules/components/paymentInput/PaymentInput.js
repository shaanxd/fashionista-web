import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Radio, RadioGroup } from 'react-custom-radio-buttons';
import { Collapse } from 'react-collapse';

import { AppInput } from '../';

import styles from './PaymentInput.module.css';
import { PAYMENTS } from '../../constants/types';

const PaymentInput = props => {
  return (
    <div className={styles.details__container}>
      <Formik
        initialValues={{
          type: '',
          name: '',
          number: '',
          expirationDate: '',
          cvv: ''
        }}
        validationSchema={Yup.object().shape({
          type: Yup.string()
            .oneOf([PAYMENTS.CASH_ON_DELIVERY, PAYMENTS.CARD_PAYMENT])
            .required('Payment type should be selected'),
          name: Yup.string().when('type', {
            is: PAYMENTS.CARD_PAYMENT,
            then: Yup.string().required('Card number is required')
          }),
          number: Yup.string().when('type', {
            is: PAYMENTS.CARD_PAYMENT,
            then: Yup.string().required('Card number is required')
          }),
          expirationDate: Yup.string().when('type', {
            is: PAYMENTS.CARD_PAYMENT,
            then: Yup.string().required('Card number is required')
          }),
          cvv: Yup.string().when('type', {
            is: PAYMENTS.CARD_PAYMENT,
            then: Yup.string().required('Card number is required')
          })
        })}
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
                <AppInput name="number" placeholder="Card number" type="text" />
                <div className={styles.nested__div}>
                  <AppInput
                    name="expirationDate"
                    placeholder="Expiration date"
                    type="text"
                  />
                  <AppInput name="cvv" placeholder="CVV" type="text" />
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
