import React from 'react';

import styles from './CartDrawer.module.css';
import CartDropdown from '../cartDropdown/CartDropdown';

const CartDrawer = props => {
  let style = props.isOpen
    ? [styles.drawer__div, styles.open].join(' ')
    : styles.drawer__div;

  return (
    <div className={style}>
      <CartDropdown
        onCartRetry={props.onCartRetry}
        onDeleteCart={props.onDeleteCart}
        cart={props.cart}
        loading={props.loading}
        error={props.error}
      />
    </div>
  );
};

export default CartDrawer;
