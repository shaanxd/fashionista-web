import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { IoIosClose } from 'react-icons/io';

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
        <button
          className={styles.remove__button}
          onClick={() => {
            props.onDeleteCart(id);
          }}
        >
          <IoIosClose color="black" size={30} />
        </button>
      </div>
    );
  };

  const renderCart = () => {
    const items = cart.items.map((item, index) => renderCartItem(item, index));

    return (
      <div className={styles.items__div}>
        <div className={styles.control__container}>
          <button
            className={styles.close__button}
            onClick={props.cartClickHandler}
          >
            <IoIosClose color="gray" size={25} />
            <span className={styles.close__text}>CLOSE</span>
          </button>
        </div>
        <span className={styles.cart__header}>SHOPPING CART:</span>
        {items}
        <div className={styles.price__div}>
          <span>Total:</span>
          <span>{`$${cart.totalPrice}`}</span>
        </div>
        <button className={styles.view__button} onClick={props.onCheckout}>
          <span>CHECK OUT</span>
        </button>
        <div className={styles.padding__div} />
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
