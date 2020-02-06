import React from 'react';

import { getImageUrl } from '../../utils/productUtils';

import styles from './CategoryItem.module.css';

const CategoryItem = props => {
  const {
    item: { image, id, name, type },
    onCategoryClick
  } = props;

  const handleCategoryClick = () => {
    onCategoryClick({ id, type });
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.tag__div} onClick={handleCategoryClick}>
        <img src={getImageUrl(image)} className={styles.tag__image} alt="tag" />
        <div className={styles.backdrop__div}>{name}</div>
      </div>
    </div>
  );
};

export default CategoryItem;
