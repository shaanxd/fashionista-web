import React from 'react';
import { IoIosClose } from 'react-icons/io';

import { getImageUrl } from '../../utils/productUtils';

import styles from './CartItem.module.css';

const CartItem = props => {
  const {
    item: { product, quantity, totalPrice, size, id }
  } = props;
  return (
    <div className={styles.cart__item}>
      <img
        src={getImageUrl(product.thumbnail)}
        alt="thumbnail"
        className={styles.cart__thumbnail}
      />
      <div className={styles.cart__details}>
        <span className={styles.product__name}>{product.name}</span>
        <div className={styles.details__horizontal}>
          <span className={styles.product__size}>{size}</span>
          <span className={styles.product__quantity}>{`x${quantity}`}</span>
        </div>
      </div>
      <div className={styles.cart__price}>{`$${totalPrice}`}</div>
      {props.onDeleteCart && (
        <button
          className={styles.remove__button}
          onClick={() => {
            props.onDeleteCart(id);
          }}
        >
          <IoIosClose color="black" size={30} />
        </button>
      )}
    </div>
  );
};

export default CartItem;
