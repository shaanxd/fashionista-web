import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';

import styles from './CartDropdown.module.css';
import { Loading, CartItem, Glitch } from '..';
import AppButton from '../appButton/AppButton';

const CartDropdown = props => {
  const { cart, loading, error } = props;

  const renderCart = () => {
    const items = cart.items.map((item, index) => (
      <CartItem
        item={item}
        key={index}
        onDeleteCart={() => {
          props.onDeleteCart(item.id);
        }}
      />
    ));

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
        <AppButton onClick={props.onCheckout} text="Check out" type="button" />
        <div className={styles.padding__div} />
      </div>
    );
  };

  const renderLoading = () => {
    return <Loading text="Loading cart" />;
  };

  const renderError = () => {
    return (
      <Glitch
        onRetry={props.onCartRetry}
        text={error}
        icon={AiOutlineShopping}
      />
    );
  };

  const renderEmpty = () => {
    return (
      <div className={styles.other__div}>
        <AiOutlineShopping color="black" size={30} />
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
