import React from 'react';
import { withRouter } from 'react-router-dom';

import { AppButton } from '../../components';
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
          placeholder="SEARCH PRODUCT"
          onChange={handleOnSearchChange}
        />
        <div className={styles.btn__div}>
          <AppButton
            text="Add Product"
            type="button"
            onClick={handleOnAddProductClick}
          />
          <div className={styles.separator} />
          <AppButton
            text="Add Tag"
            type="button"
            onClick={handleOnAddTagClick}
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(AdminHome);
