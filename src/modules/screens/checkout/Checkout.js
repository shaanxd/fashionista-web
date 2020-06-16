import React, { useEffect } from 'react';
import { Collapse } from 'react-collapse';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { PAYMENTS } from '../../constants/types';
import { useMergedState, usePrevious } from '../../utils/useMergedState';
import {
  ShippingInput,
  PaymentInput,
  OrderConfirmation,
  CartItem
} from '../../components';
import { checkoutCart } from '../../api/cart';
import { checkoutSuccess } from '../../actions/cart';

import './Checkout.css';
import styles from './Checkout.module.css';

const Checkout = props => {
  const [state, setState] = useMergedState({
    step: 0,
    shipping: null,
    payment: null,

    loading: false,
    error: null,
    success: false
  });

  const { cartLoading: currentCartLoading } = props;

  const prevCartLoading = usePrevious(currentCartLoading);
  const prevSuccess = usePrevious(state.success);

  useEffect(() => {
    if (
      prevCartLoading &&
      !currentCartLoading &&
      props.cart.numberOfItems === 0
    ) {
      props.history.push('/');
    }
  });

  useEffect(() => {
    if (!prevSuccess && state.success) {
      props.history.push('/orders');
    }
  });

  const submitShipping = ({ firstname, lastname, ...rest }) => {
    setState({
      step: 1,
      shipping: { name: `${lastname}, ${firstname}`, ...rest }
    });
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

  const onFormSubmit = async () => {
    const data = {
      cart: props.cart.items.map(item => item.id),
      ...state.shipping,
      payment: state.payment.type
    };
    try {
      setState({ loading: true, error: null });
      await checkoutCart(data, props.token);
      setTimeout(() => {
        props.clearCart();
        setState({ loading: false, success: true });
      }, 1000);
      //  const result = await checkoutCart(data, props.token);
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  const renderHeader = (text, value, callback) => {
    return (
      <div className={styles.header__container}>
        <span className={styles.header__text}>{text}</span>
        {state.step > value && (
          <div className={styles.header__controls}>
            <button
              className={styles.edit__button}
              onClick={callback}
              disabled={props.cartLoading || state.loading}
            >
              EDIT
            </button>
            <IoIosCheckmarkCircle color="#f63854" size={30} />
          </div>
        )}
      </div>
    );
  };

  const renderCartList = () => {
    const items = props.cart.items.map((item, index) => (
      <CartItem item={item} key={index} />
    ));
    return items;
  };

  const renderCheckout = () => {
    return (
      <div className={styles.parent__div}>
        <div className={styles.details__div}>
          {renderHeader('SHIPPING INFORMATION', 0, toShipping)}
          <Collapse isOpened={state.step === 0}>
            <ShippingInput
              onSubmit={submitShipping}
              loading={state.loading || props.cartLoading}
            />
          </Collapse>
          {renderHeader('PAYMENT INFORMATION', 1, toPayment)}
          <Collapse isOpened={state.step === 1}>
            <PaymentInput
              onPrevious={toShipping}
              onSubmit={submitPayment}
              loading={state.loading || props.cartLoading}
            />
          </Collapse>
          {renderHeader('CONFIRM ORDER', 2)}
          <Collapse isOpened={state.step === 2}>
            <OrderConfirmation
              shipping={state.shipping}
              payment={state.payment}
              onPrevious={toPayment}
              onSubmit={onFormSubmit}
              loading={state.loading || props.cartLoading}
            />
          </Collapse>
          {state.error && (
            <span className={styles.main__error}>{state.error}</span>
          )}
        </div>
        <div className={styles.seperator__div} />
        <div className={styles.cart__div}>
          <div className={styles.header__container}>
            <span className={styles.header__text}>YOUR ORDER</span>
            <button
              className={styles.edit__button}
              onClick={props.cartClickHandler}
            >
              EDIT SHOPPING BAG
            </button>
          </div>
          <div className={styles.cart__list}>{renderCartList()}</div>
          <div className={styles.cart__info}>
            <span className={styles.total__label}>TOTAL:</span>
            <span>{`$${props.cart.totalPrice}`}</span>
          </div>
        </div>
      </div>
    );
  };

  return <div className={styles.main__div}>{renderCheckout()}</div>;
};

const mapStateToProps = ({
  cart: { cart, cartLoading },
  auth: {
    auth: { token }
  }
}) => {
  return {
    cart,
    cartLoading,
    token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => {
      dispatch(checkoutSuccess());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);
