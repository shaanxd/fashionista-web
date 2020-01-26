import React from 'react';

import styles from './CartDropdown.module.css';
import Loading from '../loading/Loading';

const CartDropdown = props => {
  const { cart, loading, error } = props;

  const renderCart = () => {
    return <div>{JSON.stringify(cart)}</div>;
  };

  const renderLoading = () => {
    return <Loading text="Loading cart" />;
  };

  const renderError = () => {
    return <div>{error}</div>;
  };

  return (
    <div className={styles.dropdown__div}>
      {loading ? renderLoading() : error ? renderError() : renderCart()}
    </div>
  );
};

export default CartDropdown;
