import React from 'react';

import styles from './Checkout.module.css';

const Checkout = props => {
  return (
    <div className={styles.main__div}>
      <div className={styles.parent__div}>
        <div className={styles.details__div}>
          <div className={styles.header__container}>
            <span className={styles.header__text}>SHIPPING INFORMATION</span>
          </div>
          <div className={styles.details__container}></div>
          <div className={styles.header__container}>
            <span className={styles.header__text}>PAYMENT INFORMATION</span>
          </div>
          <div className={styles.payment__container}></div>
        </div>
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
