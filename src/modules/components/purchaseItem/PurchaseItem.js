import React from 'react';
import Moment from 'moment';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Collapse } from 'react-collapse';

import styles from './PurchaseItem.module.css';
import './PurchaseItem.css';
import { CartItem } from '..';

const PurchaseItem = props => {
  const {
    purchase: { id, orderedAt, numberOfItems, totalPrice },
    onOrderClick,
    purchase,
    isSelected,
    isFirst
  } = props;

  const handleOnOrderClick = () => {
    onOrderClick(purchase);
  };

  const renderPurchasedItems = () => {
    const items = purchase.purchases.map(purchase => {
      return <CartItem item={purchase} />;
    });

    return items;
  };

  const style = isFirst
    ? [styles.item__div, styles.first].join(' ')
    : [styles.item__div, styles.other].join(' ');

  return (
    <div className={styles.main__div}>
      <div className={style} onClick={handleOnOrderClick}>
        <div className={styles.header__content}>
          <div className={styles.order__header}>
            <span className={styles.header__title}>ORDER NO</span>
            <span className={styles.header__value}>
              {id.replace(/-/g, '').toUpperCase()}
            </span>
          </div>
          <span className={styles.order__date}>{`Placed on ${Moment(
            orderedAt
          ).format('dddd, MMMM Do YYYY')}`}</span>
          <div className={styles.meta__header}>
            <span className={styles.meta__title}>NUMBER OF ITEMS</span>
            <span className={styles.meta__value}>{numberOfItems}</span>
            <span className={styles.meta__title}>TOTAL PRICE</span>
            <span className={styles.meta__value}>{`$${totalPrice}`}</span>
          </div>
        </div>
        <div className={styles.dropdown__button}>
          {isSelected ? (
            <MdKeyboardArrowUp size={30} />
          ) : (
            <MdKeyboardArrowDown size={30} />
          )}
        </div>
      </div>
      <div className={styles.dropdown__content}>
        <Collapse isOpened={isSelected}>
          <div className={styles.inner__div}>{renderPurchasedItems()}</div>
        </Collapse>
      </div>
    </div>
  );
};

export default PurchaseItem;
