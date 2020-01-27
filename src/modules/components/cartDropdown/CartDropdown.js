import React from 'react';

import styles from './CartDropdown.module.css';
import { Loading, Icomoon } from '..';
import { getImageUrl } from '../../utils/productUtils';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';

const CartDropdown = props => {
  const { cart, loading, error } = props;

  const renderCartItem = ({ product, quantity, size }, index) => {
    return (
      <div className={styles.cart__item} key={index}>
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
        <div className={styles.cart__controls}>
          <button className={styles.remove__button}>
            <Icomoon icon="cross" color="#8B0000" size={15} />
          </button>
        </div>
      </div>
    );
  };

  const renderCart = () => {
    const items = [];
    const numberOfItems = cart.numberOfItems > 3 ? 3 : cart.numberOfItems;
    for (let i = 0; i < numberOfItems; i++) {
      items.push(renderCartItem(cart.items[i], i));
    }
    return (
      <div className={styles.items__div}>
        {items}
        <button className={styles.view__button}>
          <Icomoon icon="drawer" color="gray" size={15} />
          <span
            className={styles.button__text}
          >{`View All (${cart.numberOfItems})`}</span>
        </button>
      </div>
    );
  };

  const renderLoading = () => {
    return (
      <div className={styles.other__div}>
        <Loading text="Loading cart" />
      </div>
    );
  };

  const renderError = () => {
    return (
      <div className={styles.other__div}>
        {error}
        <button
          type="button"
          className={styles.retry__button}
          onClick={props.onCartRetry}
        >
          Retry
        </button>
      </div>
    );
  };

  const renderEmpty = () => {
    return (
      <div className={styles.other__div}>
        <Icomoon icon="drawer2" color="#d2d2d2" size={40} />
        <span className={styles.empty__text}>Cart is empty</span>
      </div>
    );
  };

  return (
    <div className={styles.dropdown__div}>
      {loading
        ? renderLoading()
        : error
        ? renderError()
        : cart.numberOfItems < 1
        ? renderEmpty()
        : renderCart()}
    </div>
  );
};

export default CartDropdown;
