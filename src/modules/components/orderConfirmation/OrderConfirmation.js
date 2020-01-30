import React from 'react';

import styles from './OrderConfirmation.module.css';
import { AppButton } from '..';

const OrderConfirmation = props => {
  const { shipping, payment } = props;

  return (
    <div className={styles.details__container}>
      <div>
        <div className={styles.header__container}>
          <div className={styles.section__header}>SHIPPED TO:</div>
          {shipping && (
            <div className={styles.inner__div}>
              <span>{shipping.name}</span>
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
          <div className={styles.button__container}>
            <AppButton
              text="EDIT PAYMENT"
              onClick={props.onPrevious}
              type="button"
              loading={props.loading}
            />
          </div>
          <div className={styles.button__container}>
            <AppButton
              text="Purchase"
              onClick={props.onSubmit}
              type="button"
              loading={props.loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
