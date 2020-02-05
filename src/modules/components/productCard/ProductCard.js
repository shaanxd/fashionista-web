import React from 'react';

import styles from './ProductCard.module.css';
import { getImageUrl } from '../../utils/productUtils';

const ProductCard = props => {
  const {
    item: { thumbnail, name, avgRating, price }
  } = props;

  return (
    <div className={styles.main__div}>
      <div className={styles.product__div}>
        <img
          src={getImageUrl(thumbnail)}
          className={styles.product__thumbnail}
          alt="thumbnail"
        />
        <span className={styles.product__name}>{name}</span>
        <span className={styles.product__price}>${price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductCard;
