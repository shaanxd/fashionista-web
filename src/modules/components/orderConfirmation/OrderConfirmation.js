import React from 'react';

import styles from './OrderConfirmation.module.css';

const OrderConfirmation = props => {
  const { shipping, payment } = props;

  return (
    <div className={styles.details__container}>
      <div className={styles.header__container}>
        <div className={styles.section__header}>SHIPPED TO:</div>
        {shipping && (
          <div className={styles.inner__div}>
            <span>{`${shipping.firstname} ${shipping.lastname},`}</span>
            <span>{`${shipping.address} ,${shipping.city}`}</span>
            <span>{shipping.country}</span>
          </div>
        )}
      </div>
      <div className={styles.seperator__div} />
      <div className={styles.header__container}>
        <div className={styles.section__header}>PAYMENT:</div>
        {payment && (
          <div className={styles.inner__div}>
            {payment.type
              .replace(/_/g, ' ')
              .toLowerCase()
              .replace(/\w\S*/g, function(txt) {
                return (
                  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                );
              })}
          </div>
        )}
      </div>
      <div className={styles.nested__div}>
        <button
          className={styles.submit__button}
          type="button"
          onClick={props.onPrevious}
        >
          EDIT PAYMENT
        </button>
        <button className={styles.submit__button} type="button">
          PURCHASE
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
