import React from 'react';
import Moment from 'moment';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Collapse } from 'react-collapse';

import { OrderDetails } from '..';

import styles from './PurchaseItem.module.css';
import './PurchaseItem.css';
import { FiArrowDownRight } from 'react-icons/fi';

const PurchaseItem = props => {
  const {
    purchase: { id, orderedAt, numberOfItems, totalPrice },
    onOrderClick,
    purchase,
    isSelected
  } = props;

  const handleOnOrderClick = () => {
    onOrderClick(purchase);
  };

  const item__style = isSelected
    ? [styles.purchase__content, styles.selected].join(' ')
    : styles.purchase__content;

  return (
    <div className={styles.item__div} onClick={handleOnOrderClick}>
      <div className={item__style}>
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
            <MdKeyboardArrowUp size={20} />
          ) : (
            <MdKeyboardArrowDown size={20} />
          )}
        </div>
        <div
          className={
            !isSelected
              ? styles.view__button
              : [styles.view__button, styles.rotate].join(' ')
          }
        >
          <FiArrowDownRight size={20} />
        </div>
      </div>
      <div className={styles.dropdown__content}>
        <Collapse isOpened={isSelected}>
          <OrderDetails item={purchase} />
        </Collapse>
      </div>
    </div>
  );
};

export default PurchaseItem;
