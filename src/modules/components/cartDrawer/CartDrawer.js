import React from 'react';

import styles from './CartDrawer.module.css';
import CartDropdown from '../cartDropdown/CartDropdown';
import { withRouter } from 'react-router-dom';

const CartDrawer = props => {
  let style = props.isOpen
    ? [styles.drawer__div, styles.open].join(' ')
    : styles.drawer__div;

  const onCheckout = () => {
    props.history.push('/checkout');
    props.close();
  };

  return (
    <div className={style}>
      <CartDropdown
        onCartRetry={props.onCartRetry}
        onDeleteCart={props.onDeleteCart}
        cart={props.cart}
        loading={props.loading}
        error={props.error}
        onCheckout={onCheckout}
        cartClickHandler={props.cartClickHandler}
      />
    </div>
  );
};

export default withRouter(CartDrawer);
