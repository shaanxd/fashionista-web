import React from 'react';
import { withRouter } from 'react-router-dom';

import styles from './AdminHome.module.css';

const AdminHome = props => {
  const handleOnSearchChange = () => {};

  const handleOnAddTagClick = () => {
    props.history.push('/add-tag');
  };

  const handleOnAddProductClick = () => {
    props.history.push('/add-product');
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.navigation__div}>
        <input
          type="text"
          className={styles.search__input}
          placeholder="Search Product"
          onChange={handleOnSearchChange}
        />
        <div className={styles.btn__div}>
          <button
            className={styles.navigation__btn}
            onClick={handleOnAddProductClick}
          >
            Add Product
          </button>
          <button
            className={styles.navigation__btn}
            onClick={handleOnAddTagClick}
          >
            Add Tag
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AdminHome);
