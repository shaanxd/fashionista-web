import React from 'react';

import { AppButton } from '..';
import { getImageUrl } from '../../utils/productUtils';

import styles from './ProductCard.module.css';
import { Rate } from 'antd';

const ProductCard = props => {
  const {
    item: { thumbnail, name, avgRating, price, id },
    onProductClick
  } = props;

  const handleProductClick = () => {
    onProductClick(id);
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.product__div}>
        <div className={styles.hover__div}>
          <AppButton
            text="VIEW PRODUCT"
            containerStyle={{ width: '75%' }}
            onClick={handleProductClick}
          />
        </div>
        <img
          src={getImageUrl(thumbnail)}
          className={styles.product__thumbnail}
          alt="thumbnail"
        />
        <span className={styles.product__name}>{name}</span>
        <div className={styles.rating__container}>
          <Rate
            disabled={true}
            value={avgRating}
            style={{ color: '#87E1DD' }}
          />
        </div>
        <span className={styles.product__price}>${price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductCard;
