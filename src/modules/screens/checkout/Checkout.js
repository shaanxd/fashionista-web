import React from 'react';
import { Collapse } from 'react-collapse';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { PAYMENTS } from '../../constants/types';
import { useMergedState } from '../../utils/useMergedState';
import {
  ShippingInput,
  PaymentInput,
  OrderConfirmation
} from '../../components';

import './Checkout.css';
import styles from './Checkout.module.css';

const Checkout = props => {
  const [state, setState] = useMergedState({
    step: 0,
    shipping: {
      firstname: 'Shahid',
      lastname: 'Hassan',
      address: '434/B, Enderamulla',
      city: 'Wattala',
      country: 'Sri Lanka.'
    },
    payment: {
      type: 'CARD_PAYMENT',
      holderName: '123',
      cardNumber: '123',
      expiryDate: '123',
      cvc: '123'
    }
  });

  const backward = () => {
    setState(prevState => ({ ...prevState, step: prevState.step - 1 }));
  };

  const submitShipping = shipping => {
    setState({ step: 1, shipping: { ...shipping } });
  };

  const submitPayment = payment => {
    setState({
      step: 2,
      payment:
        payment.type === PAYMENTS.CARD_PAYMENT
          ? { ...payment }
          : { type: payment.type }
    });
  };

  const toShipping = () => {
    setState({ step: 0 });
  };

  const toPayment = () => {
    setState({ step: 1 });
  };

  const renderHeader = (text, value, callback) => {
    return (
      <div className={styles.header__container}>
        <span className={styles.header__text}>{text}</span>
        {state.step > value && (
          <div className={styles.header__controls}>
            <button className={styles.edit__button} onClick={callback}>
              EDIT
            </button>
            <IoIosCheckmarkCircle color="black" size={20} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.parent__div}>
        <div className={styles.details__div}>
          {renderHeader('SHIPPING INFORMATION', 0, toShipping)}
          <Collapse isOpened={state.step === 0}>
            <ShippingInput onSubmit={submitShipping} />
          </Collapse>
          {renderHeader('PAYMENT INFORMATION', 1, toPayment)}
          <Collapse isOpened={state.step === 1}>
            <PaymentInput onPrevious={backward} onSubmit={submitPayment} />
          </Collapse>
          {renderHeader('CONFIRM ORDER', 2)}
          <Collapse isOpened={state.step === 2}>
            <OrderConfirmation
              shipping={state.shipping}
              payment={state.payment}
              onPrevious={backward}
            />
          </Collapse>
        </div>
        <div className={styles.seperator__div} />
        <div className={styles.cart__div}>
          <div className={styles.header__container}>
            <span className={styles.header__text}>YOUR ORDER</span>
            <button className={styles.edit__button}>EDIT SHOPPING BAG</button>
          </div>
          <div className={styles.cart__list}></div>
          <div className={styles.cart__info}></div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart: { cart, cartLoading } }) => {
  return {
    cart,
    cartLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);
