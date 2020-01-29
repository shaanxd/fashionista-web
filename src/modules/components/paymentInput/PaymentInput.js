import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Radio, RadioGroup } from 'react-custom-radio-buttons';
import { Collapse } from 'react-collapse';
import { cardMask, dateMask, cvcMask } from '../../constants/masks';

import { AppInput, MaskInput } from '../';

import styles from './PaymentInput.module.css';
import { PAYMENTS } from '../../constants/types';

const PaymentInput = props => {
  return (
    <div className={styles.details__container}>
      <Formik
        initialValues={{
          type: '',
          holderName: '',
          cardNumber: '',
          expiryDate: '',
          cvc: ''
        }}
        validationSchema={Yup.object().shape({
          type: Yup.string()
            .oneOf([PAYMENTS.CASH_ON_DELIVERY, PAYMENTS.CARD_PAYMENT])
            .required('Payment type should be selected'),
          holderName: Yup.string().when('type', {
            is: PAYMENTS.CARD_PAYMENT,
            then: Yup.string().required('Cardholder name is required')
          }),
          cardNumber: Yup.number().when('type', {
            is: PAYMENTS.CARD_PAYMENT,
            then: Yup.number()
              .typeError('Invalid card number')
              .required('Card number is required')
          }),
          expiryDate: Yup.string().when('type', {
            is: PAYMENTS.CARD_PAYMENT,
            then: Yup.string().required('Expiration date is required')
          }),
          cvc: Yup.string().when('type', {
            is: PAYMENTS.CARD_PAYMENT,
            then: Yup.string()
              .required('CVC is required')
              .min(3, 'Invalid CVC')
              .max(3, 'Invalid CVC')
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
                <MaskInput
                  name="cardNumber"
                  placeholder="Card number"
                  mask={cardMask}
                  placeholderChar="0"
                />
                <div className={styles.payment__nested}>
                  <MaskInput
                    name="expiryDate"
                    placeholder="Expiration date"
                    mask={dateMask}
                    placeholderChar="0"
                  />
                  <div className={styles.separator__div} />
                  <MaskInput
                    name="cvc"
                    placeholder="CVC"
                    mask={cvcMask}
                    placeholderChar="0"
                  />
                </div>
                <AppInput
                  name="holderName"
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
                  EDIT SHIPPING
                </button>
                <button className={styles.submit__button} type="submit">
                  PROCEED CHECKOUT
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
