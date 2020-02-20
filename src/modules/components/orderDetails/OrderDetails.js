import React from 'react';
import Moment from 'moment';

import { CartItem } from '../../components';

import styles from './OrderDetails.module.css';

const OrderDetails = props => {
  const {
    item: { id, orderedAt, numberOfItems, totalPrice, purchases }
  } = props;

  const renderPurchasedItems = () => {
    const items = purchases.map(purchase => {
      return <CartItem item={purchase} key={purchase.id} />;
    });

    return items;
  };

  return (
    <div className={styles.item__list}>
      <span className={styles.div__title}>ORDER DETAILS</span>
      <span className={styles.header__title}>{`ORDER #${id.replace(/-/g, '').toUpperCase()}`}</span>
      <span className={styles.order__date}>{`Placed on ${Moment(orderedAt).format('dddd, MMMM Do YYYY')}`}</span>
      <div className={styles.meta__group}>
        <span className={styles.meta__title}>NUMBER OF ITEMS</span>
        <span className={styles.meta__value}>{numberOfItems}</span>
      </div>
      <div className={styles.meta__group}>
        <span className={styles.meta__title}>PAID USING</span>
        <span className={styles.meta__value}>Cash On Delivery</span>
      </div>
      <div className={styles.meta__address}>
        <span className={styles.meta__title}>SHIPPED TO</span>
        <span className={styles.meta__value}>{'Shahid Hassan, 434/B, Enderamulla, Wattala.'}</span>
      </div>
      <div className={styles.meta__group}>
        <span className={styles.meta__title}>LIST OF ITEMS</span>
      </div>
      {renderPurchasedItems()}
      <div className={styles.meta__total}>
        <span className={styles.meta__title}>TOTAL PRICE</span>
        <span className={styles.meta__value}>{`$${totalPrice}`}</span>
      </div>
    </div>
  );
};

export default OrderDetails;
