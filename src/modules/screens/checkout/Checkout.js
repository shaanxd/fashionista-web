import React from 'react';
import { Collapse } from 'react-collapse';
import { useMergedState } from '../../utils/useMergedState';

import './Checkout.css';
import styles from './Checkout.module.css';

const Checkout = props => {
  const [state, setState] = useMergedState({
    step: 0
  });

  const forward = () => {
    setState(prevState => ({ ...prevState, step: prevState.step + 1 }));
  };
  const backward = () => {
    setState(prevState => ({ ...prevState, step: prevState.step - 1 }));
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.parent__div}>
        <div className={styles.details__div}>
          <div className={styles.header__container}>
            <span className={styles.header__text}>SHIPPING INFORMATION</span>
          </div>
          <Collapse isOpened={state.step === 0}>
            <div className={styles.details__container}>
              <button onClick={forward}>Go to payment!</button>
            </div>
          </Collapse>
          <div className={styles.header__container}>
            <span className={styles.header__text}>PAYMENT INFORMATION</span>
          </div>
          <Collapse isOpened={state.step === 1}>
            <div className={styles.payment__container}>
              <button onClick={backward}>Go to shipping!</button>
              <button onClick={forward}>Go to Confirm!</button>
            </div>
          </Collapse>
          <div className={styles.header__container}>
            <span className={styles.header__text}>CONFIRM ORDER</span>
          </div>
          <Collapse isOpened={state.step === 2}>
            <div className={styles.payment__container}>
              <button onClick={backward}>Go to shipping!</button>
            </div>
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

export default Checkout;
