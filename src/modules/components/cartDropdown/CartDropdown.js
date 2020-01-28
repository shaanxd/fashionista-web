import React from 'react';
import { MdCancel, MdAddShoppingCart } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import styles from './CartDropdown.module.css';
import { Loading } from '..';
import { getImageUrl } from '../../utils/productUtils';

const CartDropdown = props => {
  const { cart, loading, error } = props;

  const renderCartItem = (
    { product, quantity, size, id, totalPrice },
    index
  ) => {
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
        <div className={styles.cart__price}>{`$${totalPrice}`}</div>
        <div className={styles.cart__controls}>
          <button
            className={styles.remove__button}
            onClick={() => {
              props.onDeleteCart(id);
            }}
          >
            <MdCancel color="gray" size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderCart = () => {
    const items = cart.items.map((item, index) => renderCartItem(item, index));

    return (
      <div className={styles.items__div}>
        <div className={styles.list__div}>{items}</div>
        <div className={styles.price__div}>
          <span>SUB-TOTAL</span>
          <span>{`$${cart.totalPrice}`}</span>
        </div>
        <button className={styles.view__button}>
          <AiOutlineShoppingCart color="gray" size={15} />
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
        <MdAddShoppingCart color="gray" size={40} />
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
